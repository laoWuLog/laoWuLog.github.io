---
title: 图片URL缓存系统设计与实现
date: 2025-06-19
sidebar: auto
categories:
  - 技术分享
  - 前端开发
tags:
  - TypeScript
  - IndexedDB
  - 缓存系统
  - Vue3
---

# 图片URL缓存系统设计与实现

## 功能概述

图片URL缓存功能用于减少对后端预签名URL接口的频繁请求，提高应用性能并减轻后端服务压力。使用 **IndexedDB** 作为主要存储引擎，支持持久化存储和更大的存储容量，同时提供内存缓存作为降级方案。

## 主要特性

- **持久化存储**: 使用 IndexedDB 存储，页面刷新后缓存不丢失
- **大容量存储**: IndexedDB 支持更大的存储空间，适合大量会话聊天数据
- **智能降级**: 当 IndexedDB 不可用时，自动降级到内存缓存
- **智能缓存**: 根据预签名URL中的过期参数智能计算缓存时长
- **自动清理**: 每30分钟自动清理过期的缓存项
- **索引优化**: 使用索引优化查询性能
- **调试支持**: 开发环境下提供详细的缓存日志和调试工具

## 缓存时间计算逻辑

系统采用三级缓存时间计算策略，按优先级顺序：

### 1. URL参数解析（最高优先级）
从预签名URL中解析 `X-Amz-Expires` 参数：
```
https://example.com/image.jpg?X-Amz-Expires=86400&...
```
- 解析 `X-Amz-Expires=86400`（单位：秒）
- **使用返回时间的一半作为缓存时间**（86400秒 → 43200秒 = 12小时）
- 确保在URL实际过期前有足够时间更新缓存

### 2. 接口返回参数（中等优先级）
使用后端接口返回的 `cacheDuration` 字段：
```typescript
interface FilePresignedUrlRespVO {
  url: string
  cacheDuration?: number // 缓存时长（毫秒）
}
```

### 3. 默认缓存时长（最低优先级）
如果以上两种方式都无法获取缓存时长，使用默认的1小时缓存。

### 缓存时间计算示例
```typescript
// 示例URL
const url = "https://label-scrm.s3.ap-southeast-1.amazonaws.com/labelxs/ws/image/20250619/a6d9d020bd0db080dd.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250619T032233Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAUQ5XUFTQZ250619%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=ed90f8952664798155a20fe7ef9f1e62f8ffb14a57677f764"

// 解析结果
// X-Amz-Expires=86400 (24小时)
// 缓存时间 = 86400秒 / 2 = 43200秒 (12小时)
```

### 异常处理机制
系统具备完善的异常处理机制，确保在各种异常情况下都能正常工作：

#### URL解析异常
- **URL格式错误**: 自动降级到接口参数
- **参数缺失**: 自动降级到接口参数
- **数值转换失败**: 自动降级到接口参数

#### 接口参数异常
- **参数类型错误**: 自动降级到默认值
- **参数值无效**: 自动降级到默认值
- **计算异常**: 自动降级到默认值

#### 降级策略
```typescript
// 异常处理流程
try {
  // 1. 尝试URL解析
  const urlExpires = parseExpiresFromUrl(url)
  if (urlExpires) {
    return now + (urlExpires / 2 * 1000)
  }
} catch (error) {
  console.warn('URL解析失败，降级到接口参数')
}

try {
  // 2. 尝试接口参数
  if (responseCacheDuration) {
    return now + responseCacheDuration
  }
} catch (error) {
  console.warn('接口参数失败，降级到默认值')
}

// 3. 使用默认值
return now + 3600000 // 1小时
```

## 缓存模式

系统支持两种缓存模式：

### 1. IndexedDB 模式（推荐）
- **存储容量**: 大容量，通常为可用磁盘空间的50%
- **持久性**: 页面刷新后缓存不丢失
- **适用场景**: 生产环境，大量数据缓存

### 2. 内存缓存模式（降级方案）
- **存储容量**: 受内存限制，适合少量数据
- **持久性**: 页面刷新后缓存丢失
- **适用场景**: IndexedDB 不可用时的降级方案

### 自动降级机制
系统会在以下情况下自动降级到内存缓存：
- IndexedDB 不可用（如隐私模式、浏览器不支持）
- IndexedDB 初始化失败
- IndexedDB 操作失败

## 存储架构

### IndexedDB 数据库结构
- **数据库名**: `ImageUrlCacheDB`
- **版本**: `1`
- **对象存储**: `imageUrlCache`
- **主键**: `fileUrl` (文件路径)
- **索引**: 
  - `expireTime`: 过期时间索引，用于快速清理过期缓存
  - `createTime`: 创建时间索引，用于统计分析

### 缓存数据结构
```typescript
interface CacheItem {
  fileUrl: string      // 文件路径（主键）
  url: string         // 临时访问URL
  expireTime: number  // 过期时间戳
  createTime: number  // 创建时间戳
}
```

## 核心代码实现

### 1. 缓存时间计算函数
```typescript
const calculateExpireTime = (url: string, responseCacheDuration?: number): number => {
  const now = Date.now()
  
  // 1. 优先从URL中解析X-Amz-Expires参数
  const urlExpiresSeconds = parseExpiresFromUrl(url)
  if (urlExpiresSeconds) {
    try {
      // 使用返回时间的一半作为缓存时间
      const halfExpiresSeconds = Math.floor(urlExpiresSeconds / 2)
      const expireTime = now + (halfExpiresSeconds * 1000)
      
      if (isDebugMode) {
        console.log('从URL解析过期时间:', {
          originalExpiresSeconds: urlExpiresSeconds,
          halfExpiresSeconds,
          expireTime: new Date(expireTime).toLocaleString(),
          strategy: '使用返回时间的一半'
        })
      }
      
      return expireTime
    } catch (error) {
      console.warn('计算URL缓存时间失败，降级到接口参数:', error)
    }
  }
  
  // 2. 使用接口返回的缓存时长
  if (responseCacheDuration && typeof responseCacheDuration === 'number' && responseCacheDuration > 0) {
    try {
      const expireTime = now + responseCacheDuration
      
      if (isDebugMode) {
        console.log('使用接口返回的缓存时长:', {
          responseCacheDuration,
          expireTime: new Date(expireTime).toLocaleString()
        })
      }
      
      return expireTime
    } catch (error) {
      console.warn('计算接口缓存时间失败，降级到默认值:', error)
    }
  }
  
  // 3. 使用默认缓存时长（1小时）
  const defaultCacheDuration = 3600000 // 1小时（毫秒）
  const expireTime = now + defaultCacheDuration
  
  if (isDebugMode) {
    console.log('使用默认缓存时长:', {
      defaultCacheDuration,
      expireTime: new Date(expireTime).toLocaleString(),
      reason: 'URL解析失败或接口未返回缓存时长'
    })
  }
  
  return expireTime
}
```

### 2. 主要API接口
```typescript
// 获取图片的临时访问URL（带缓存）
export const getImageTempUrl = async (fileUrl: string): Promise<string> => {
  if (!fileUrl) {
    return ''
  }

  try {
    // 检查缓存
    const cached = await getCache(fileUrl)
    if (cached) {
      if (isDebugMode) {
        console.log('使用缓存的图片URL:', fileUrl)
      }
      return cached.url
    }

    // 请求新的URL
    if (isDebugMode) {
      console.log('请求新的图片URL:', fileUrl)
    }
    
    const response = await getFilePresignedUrl(fileUrl)
    if (response && response.url) {
      // 使用新的缓存时间计算逻辑
      const expireTime = calculateExpireTime(response.url, response.cacheDuration)
      const now = Date.now()
      
      // 保存到缓存
      const cacheItem: CacheItem = {
        url: response.url,
        expireTime,
        createTime: now
      }
      
      await saveCache(fileUrl, cacheItem)
      
      if (isDebugMode) {
        console.log('缓存图片URL:', fileUrl, '过期时间:', new Date(expireTime).toLocaleString())
      }
      
      return response.url
    } else {
      // 如果获取临时URL失败，使用原始URL
      return fileUrl
    }
  } catch (error) {
    console.error('获取图片临时URL失败:', error)
    // 出错时使用原始URL
    return fileUrl
  }
}

// 批量获取图片临时URL（带缓存）
export const getImageTempUrls = async (fileUrls: string[]): Promise<string[]> => {
  if (!fileUrls || fileUrls.length === 0) {
    return []
  }

  const promises = fileUrls.map(url => getImageTempUrl(url))
  return Promise.all(promises)
}
```

## API接口

### getImageTempUrl(fileUrl: string): Promise<string>
获取图片的临时访问URL，优先使用缓存

```typescript
import { getImageTempUrl } from '@/utils/imageUrl'

const imageUrl = await getImageTempUrl('path/to/image.jpg')
```

### getImageTempUrls(fileUrls: string[]): Promise<string[]>
批量获取图片临时URL

```typescript
import { getImageTempUrls } from '@/utils/imageUrl'

const imageUrls = await getImageTempUrls(['path1.jpg', 'path2.jpg'])
```

### clearImageUrlCache(fileUrl?: string): Promise<void>
清除缓存，可指定清除单个URL或所有缓存

```typescript
import { clearImageUrlCache } from '@/utils/imageUrl'

// 清除所有缓存
await clearImageUrlCache()

// 清除指定URL的缓存
await clearImageUrlCache('path/to/image.jpg')
```

### getImageUrlCacheStats(): Promise<{total: number, valid: number, expired: number}>
获取缓存统计信息

```typescript
import { getImageUrlCacheStats } from '@/utils/imageUrl'

const stats = await getImageUrlCacheStats()
console.log(stats) // { total: 10, valid: 8, expired: 2 }
```

### cleanExpiredImageUrlCache(): Promise<number>
手动清理过期缓存

```typescript
import { cleanExpiredImageUrlCache } from '@/utils/imageUrl'

const cleanedCount = await cleanExpiredImageUrlCache()
console.log(`清理了 ${cleanedCount} 个过期缓存`)
```

## 后端接口要求

后端预签名URL接口需要返回以下格式的数据：

```typescript
interface FilePresignedUrlRespVO {
  configId: number
  uploadUrl: string
  url: string
  cacheDuration?: number // 缓存时长（毫秒），可选
}
```

- `cacheDuration`: 可选字段，指定缓存时长（毫秒）
- 如果不提供`cacheDuration`，系统会从URL中解析`X-Amz-Expires`参数
- 如果URL中也没有过期参数，将使用默认的1小时缓存

## 调试功能

### 开发环境
在开发环境下，可以通过浏览器控制台访问缓存管理功能：

```javascript
// 查看缓存统计
await window.imageUrlCache.getStats()

// 查看当前缓存模式
window.imageUrlCache.getCacheMode() // 'indexeddb' 或 'memory'

// 清除所有缓存
await window.imageUrlCache.clear()

// 清理过期缓存
await window.imageUrlCache.cleanExpired()

// 销毁缓存管理器
window.imageUrlCache.destroy()

// 重新初始化缓存管理器
await window.imageUrlCache.init()
```

### 浏览器开发者工具
可以通过浏览器开发者工具的 Application/Storage 标签页查看 IndexedDB 数据：
1. 打开开发者工具
2. 切换到 Application 标签页
3. 在左侧找到 IndexedDB > ImageUrlCacheDB > imageUrlCache
4. 查看存储的缓存数据

## 使用示例

### 在Vue组件中使用

```vue
<template>
  <el-image :src="imageUrl" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getImageTempUrl } from '@/utils/imageUrl'

const imageUrl = ref('')

const loadImage = async () => {
  imageUrl.value = await getImageTempUrl('path/to/image.jpg')
}

onMounted(() => {
  loadImage()
})
</script>
```

### 在消息列表中使用

```vue
<template>
  <div v-for="message in messages" :key="message.id">
    <el-image 
      v-if="message.msgType === 'image'"
      :src="message.imageUrl" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getImageTempUrl } from '@/utils/imageUrl'

const messages = ref([])

const loadMessageImages = async () => {
  for (const message of messages.value) {
    if (message.msgType === 'image' && message.fileUrl) {
      message.imageUrl = await getImageTempUrl(message.fileUrl)
    }
  }
}

onMounted(() => {
  loadMessageImages()
})
</script>
```

### 批量处理大量图片

```typescript
import { getImageTempUrls } from '@/utils/imageUrl'

const processBatchImages = async (imagePaths: string[]) => {
  try {
    // 批量获取所有图片的临时URL
    const imageUrls = await getImageTempUrls(imagePaths)
    
    // 处理结果
    imageUrls.forEach((url, index) => {
      console.log(`图片 ${index + 1}: ${url}`)
    })
  } catch (error) {
    console.error('批量处理图片失败:', error)
  }
}
```

## 性能优化建议

1. **批量处理**: 对于大量图片，使用`getImageTempUrls`批量获取
2. **预加载**: 在用户可能查看的图片之前预加载URL
3. **缓存监控**: 定期检查缓存统计，确保缓存命中率
4. **内存管理**: 在应用退出时调用`destroyImageUrlCache`清理资源
5. **错误处理**: 添加适当的错误处理，避免缓存失败影响用户体验

## 存储容量

### IndexedDB 模式
- **浏览器限制**: 通常为可用磁盘空间的50%
- **用户设置**: 用户可以在浏览器设置中调整存储限制
- **网站配额**: 不同网站有不同的存储配额

### 内存缓存模式
- **内存限制**: 受浏览器内存限制
- **建议使用**: 仅作为降级方案，不适合大量数据

对于图片URL缓存，每个缓存项大约占用几百字节，IndexedDB 模式可以存储数万条记录。

## 注意事项

1. **浏览器兼容性**: 确保目标浏览器支持 IndexedDB
2. **隐私模式**: 在隐私模式下，IndexedDB 可能不可用，会自动降级到内存缓存
3. **存储限制**: 注意浏览器的存储限制，避免超出配额
4. **异步操作**: 所有缓存操作都是异步的，需要使用 async/await
5. **错误处理**: 添加适当的错误处理，系统会自动降级处理
6. **生产环境**: 生产环境下自动禁用调试日志以提高性能
7. **缓存时间**: 系统会自动从URL中解析过期时间，确保缓存时间准确

## 故障排除

### IndexedDB 不可用
如果 IndexedDB 不可用，系统会自动降级到内存缓存模式，继续提供缓存功能。

### 缓存清理失败
如果自动清理失败，可以手动调用 `cleanExpiredImageUrlCache()` 进行清理。

### 存储空间不足
如果存储空间不足，可以调用 `clearImageUrlCache()` 清空所有缓存。

### 调试问题
在开发环境下，可以通过浏览器控制台查看详细的缓存日志和错误信息。

### 检查缓存模式
可以通过 `window.imageUrlCache.getCacheMode()` 查看当前使用的缓存模式。

### 缓存时间问题
如果发现缓存时间不准确，可以检查：
1. URL中是否包含 `X-Amz-Expires` 参数
2. 后端接口是否返回了 `cacheDuration` 字段
3. 开发环境下的缓存时间计算日志

### 异常处理问题
如果遇到缓存时间计算异常：
1. **URL解析失败**: 检查URL格式是否正确，系统会自动降级到接口参数
2. **接口参数异常**: 检查后端返回的 `cacheDuration` 字段，系统会自动降级到默认值
3. **计算异常**: 查看控制台警告信息，了解具体的异常原因
4. **降级策略**: 系统会自动选择可用的缓存策略，确保功能正常

### 调试异常情况
在开发环境下，可以通过以下方式调试异常：
```javascript
// 查看缓存统计
await window.imageUrlCache.getStats()

// 查看控制台日志，了解异常处理过程
// 例如：URL解析失败、接口参数异常等警告信息
```

## 总结

这个图片URL缓存系统通过智能的缓存策略和完善的降级机制，有效减少了后端接口的请求压力，提升了用户体验。系统的主要优势包括：

1. **智能缓存时间计算**: 根据URL参数和接口返回动态计算缓存时间
2. **完善的异常处理**: 多级降级策略确保系统稳定性
3. **高性能存储**: IndexedDB提供大容量持久化存储
4. **开发友好**: 丰富的调试功能和详细的日志记录
5. **易于使用**: 简洁的API接口，支持单张和批量图片处理

通过这个缓存系统，可以有效提升图片加载性能，减少网络请求，为用户提供更好的浏览体验。 