---
title: 问题收录
date: '2023-03-22'
---


## 浏览器同一时间可以从一个域名下载多少资源？有什么例外吗？

浏览器可以在同一时间从一个域名下载多个资源，具体数量取决于浏览器和计算机的硬件和网络条件。不过，浏览器通常会限制同一域名下同时下载的资源数量，以避免过多的资源请求导致性能下降或网络拥塞。

浏览器通常会根据不同的规则限制同一域名下的并发资源数量，比如：

- 某些浏览器（如 Chrome）默认使用最多六个并发连接下载同一域名下的资源。
- 网站开发人员可以通过 HTTP 头信息中的 `Connection` 和 `Keep-Alive` 字段来控制并发连接的数量。
- 浏览器还可以使用队列和优先级来管理资源下载的顺序和优先级。

需要注意的是，浏览器同时下载的资源数量并不一定与同一域名下的资源数量相同。如果页面中包含多个域名下的资源，浏览器可能会同时下载来自不同域名的资源。此外，一些浏览器（如 Chrome）还使用预加载技术，提前下载未来可能需要的资源，以提高网站的性能。

有一些特殊情况可能会影响同一时间从一个域名下载的资源数量限制：

1. HTTP/2协议：HTTP/2协议使用多路复用技术，可以在同一连接上同时发送多个请求和响应，从而避免了浏览器限制同一域名下并发连接数量的问题。
2. Web Workers：Web Workers 是在浏览器中运行 JavaScript 代码的独立线程，它们可以执行后台任务，而不会阻塞页面的渲染和用户交互。由于 Web Workers 在不同的线程中运行，它们可以同时下载同一域名下的多个资源。
3. Service Worker：Service Worker 是一种 JavaScript 脚本，它可以在后台处理网络请求，缓存资源并提供离线支持。Service Worker 可以在与主线程分离的线程中运行，因此可以同时下载同一域名下的多个资源。

需要注意的是，这些例外情况并不意味着浏览器可以无限制地从一个域名下载大量资源。网络带宽、服务器负载、硬件性能等因素仍然会对资源下载速度产生影响，因此开发人员应该合理使用这些技术，避免过多的资源请求，以提高网站的性能和用户体验。

## 如果你参与到一个项目中，发现他们使用 Tab 来缩进代码，但是你喜欢空格，你会怎么做？

如果我发现项目中使用 Tab 来缩进代码，但我更喜欢使用空格，我会先仔细考虑项目中的情况，以及使用空格所带来的影响和好处。

如果使用 Tab 的代码风格已经被团队所接受，并且没有造成问题，我可能会尝试尊重团队的选择，继续使用 Tab 进行缩进，以避免影响项目的一致性和协作效率。

如果使用 Tab 的代码风格尚未被团队正式确定，或者使用 Tab 会带来一些问题（例如在不同编辑器和平台之间可能会产生不同的缩进距离），我可能会考虑向团队提出使用空格进行缩进的建议，并说明使用空格的好处。如果团队同意使用空格，我们可以通过配置编辑器或者使用代码格式化工具来快速地将代码转换为使用空格进行缩进。

无论使用 Tab 还是空格进行缩进，关键是要保持代码的一致性和可读性，遵守团队所采用的代码规范，并尊重团队成员的选择。

## 什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？

FOUC（Flash Of Unstyled Content）指的是在网页加载过程中，由于浏览器渲染机制的差异，样式文件尚未加载完成或者 JavaScript 未能及时修改 DOM 树导致的页面短暂闪烁的现象。FOUC 通常会给用户带来不好的体验，因此需要尽可能地避免出现。

以下是一些常见的避免 FOUC 的方法：

1. 使用内联样式：将 CSS 样式直接嵌入 HTML 页面中，这样样式可以在页面渲染时同时加载和应用，避免出现闪烁的现象。不过，这种方法可能会增加 HTML 文件的大小，影响网页的性能。
2. 使用样式表和 `link` 标签：将 CSS 样式放入外部样式表文件中，并使用 `link` 标签引用。在 `link` 标签中添加 `rel="stylesheet"` 和 `media="all"` 属性，可以告诉浏览器该样式表是必需的，可以在页面加载时同时下载和应用。
3. 预加载样式表：在 HTML 页面的头部中使用 `<link rel="preload" href="your-stylesheet.css" as="style">` 语句可以让浏览器在页面加载时预先下载样式表，以提高页面渲染的速度和效率。
4. 使用 JavaScript：使用 JavaScript 脚本来延迟页面的显示，等到样式文件加载完成后再显示页面内容，以避免 FOUC 的出现。不过，这种方法可能会增加代码复杂度和执行时间，影响页面性能。

总之，避免 FOUC 的关键是要在网页加载过程中尽早加载和应用样式文件，避免样式文件和页面内容的不同步导致的闪烁现象。开发人员可以根据项目的具体情况选择适合的方法来避免 FOUC 的出现。

## 请解释什么是 ARIA 和屏幕阅读器 (screenreaders)，以及如何使网站实现无障碍访问 (accessible)。

ARIA（Accessible Rich Internet Applications）是一种用于提高 Web 应用程序可访问性的技术。ARIA 允许开发人员通过添加额外的语义标记和属性来定义用户界面组件的角色、状态和属性，以帮助辅助技术（如屏幕阅读器）更好地理解和解释应用程序的用户界面，从而使 Web 应用程序更易于访问和使用。

屏幕阅读器是一种辅助技术，用于帮助视觉障碍人士使用计算机和互联网。屏幕阅读器可以将屏幕上的文本、图像和其他内容转换为音频输出，以供视觉障碍人士听取。屏幕阅读器还可以通过键盘、鼠标等输入设备来控制计算机，以便视觉障碍人士可以与计算机进行交互。

为了使网站实现无障碍访问，需要考虑以下几个方面：

1. 使用语义化的 HTML 标记：使用正确的标记和语义可以帮助屏幕阅读器更好地理解和解释页面内容。例如，使用 `h1`~`h6` 标记来定义标题，使用 `nav` 标记来定义导航菜单等。
2. 添加 ARIA 属性：使用 ARIA 属性可以帮助屏幕阅读器更好地识别和解释用户界面组件的角色、状态和属性。例如，使用 `role="button"` 属性来定义按钮元素的角色，使用 `aria-checked` 属性来定义复选框或单选按钮的状态等。
3. 提供替代文本描述：对于图片、音频和视频等非文本内容，需要提供替代文本描述，以便屏幕阅读器可以将其转换为音频输出。可以使用 `alt` 属性来为图像提供替代文本描述，使用 `aria-label` 属性为按钮、链接等元素提供文本标签。
4. 使用可访问性辅助功能测试工具：使用可访问性辅助功能测试工具来检查网站的可访问性，以便发现和解决与无障碍访问相关的问题。例如，使用 WAVE、Lighthouse 等工具来测试网站的可访问性。

通过实现无障碍访问，可以提高网站的可用性和可访问性，使更多的用户可以方便地访问和使用网站。

## 在制作一个网页应用或网站的过程中，你是如何考虑其 UI、安全性、高性能、SEO、可维护性以及技术因素的？

在制作一个网页应用或网站时，需要考虑以下几个方面：

1. UI设计：UI 设计是用户界面设计的核心，需要考虑网站的布局、配色、排版、视觉效果等因素，以确保用户能够轻松地使用网站，并且留下良好的印象。
2. 安全性：安全性是非常重要的因素，需要考虑如何防止常见的网络攻击，如 XSS、CSRF、SQL 注入等。可以采用诸如输入验证、密码哈希、HTTPS、安全认证等措施来保证网站的安全性。
3. 高性能：高性能是用户体验的重要组成部分，需要考虑如何优化网站的加载速度、响应时间和渲染性能。可以采用诸如压缩文件、使用 CDN、使用缓存、延迟加载等技术来提高网站的性能。
4. SEO：搜索引擎优化是帮助用户在搜索引擎中找到网站的重要因素。需要考虑如何使用有意义的 URL、元标记、标题、关键字等来提高网站在搜索引擎中的排名。
5. 可维护性：可维护性是网站开发过程中需要考虑的重要因素，需要采用清晰的结构和命名约定、注释和文档、代码重构和测试等方法来保证网站的可维护性。
6. 技术因素：技术因素包括选择适合的技术栈、框架、库等来实现网站的功能。需要根据项目的需求、团队的能力和预算等因素来选择适合的技术方案。

综上所述，制作一个网页应用或网站需要考虑多个因素，包括 UI 设计、安全性、高性能、SEO、可维护性和技术因素等。在设计和开发过程中，需要不断优化和改进，以提高用户的体验和网站的可用性。



## 请谈谈你喜欢的开发环境。

作为一个 AI 模型，我没有偏好或感觉，但我可以向你介绍一些常见的开发环境和他们的优缺点。

1. Visual Studio Code：Visual Studio Code 是一个轻量级的代码编辑器，拥有丰富的扩展和插件库，可以满足大部分开发者的需求。它的优点包括：快速启动、强大的编辑器、良好的自动完成、集成 Git、调试功能等。同时它也是跨平台的，可以在 Windows、Mac 和 Linux 上运行。
2. IntelliJ IDEA：IntelliJ IDEA 是一个功能强大的 Java IDE，具有强大的编码助手、集成的构建系统和调试器、代码检查器等功能。它的优点包括：强大的自动完成、易于导航、智能重构、高效的代码分析、集成版本控制等。同时它还支持多种编程语言，包括 Java、Kotlin、Scala、Groovy 等。
3. Sublime Text：Sublime Text 是一个轻量级的代码编辑器，具有快速的启动时间和响应时间，支持各种插件和主题。它的优点包括：快速的启动和响应时间、高度定制化、支持各种插件和主题等。
4. Vim：Vim 是一个高度定制化的文本编辑器，拥有强大的键盘快捷键和命令行接口。它的优点包括：强大的键盘快捷键、高度可定制化、跨平台等。

总的来说，开发环境的选择因人而异，需要根据个人喜好、项目需求和团队规模等因素来选择。重要的是要选择一个能够提高开发效率、减少出错率和提高代码质量的开发环境。

## 假若你有 5 个不同的样式文件 (stylesheets), 整合进网站的最好方式是?

将五个不同的样式文件合并成一个文件可以提高网站的性能，因为这样可以减少浏览器的请求次数。以下是几种常见的合并样式文件的方法：

1. 使用 CSS 预处理器：可以使用 CSS 预处理器（如 Sass 或 Less）将多个样式文件合并成一个文件。这些预处理器提供了 @import 规则，可以将多个 CSS 文件合并成一个。
2. 使用构建工具：使用构建工具（如 Webpack 或 Gulp）可以自动将多个样式文件合并成一个文件。这样可以减少手动操作的复杂性，同时也可以在构建过程中对 CSS 文件进行压缩和优化，进一步提高性能。
3. 手动合并样式文件：手动合并样式文件是最简单的方法，但是需要注意避免样式之间的冲突。手动合并时，应该将样式文件按照顺序合并，确保后面的样式能够覆盖前面的样式，同时也需要对合并后的文件进行测试，确保没有出现样式冲突或错误。
4. 使用 HTTP/2：如果网站已经采用了 HTTP/2 协议，那么可以将多个样式文件同时请求到客户端，而不必等待一个文件的下载完成。这样可以减少页面加载时间，提高性能。

综上所述，最佳的合并样式文件的方式取决于项目需求和团队实际情况。在选择最佳方法时，应该考虑性能、可维护性、易用性和可扩展性等方面的因素。

## 什么是跨域资源共享 (CORS)？它用于解决什么问题？

跨域资源共享（CORS）是一种浏览器安全机制，用于允许一个网站（域名）的Web应用程序向另一个域名的服务器请求资源。CORS的主要目的是防止跨站点脚本攻击（XSS）和跨站点请求伪造（CSRF）等安全威胁。

在默认情况下，Web浏览器不允许从一个域的Web应用程序向另一个域的服务器发送Ajax请求，这种请求被称为跨域请求。这是因为浏览器使用同源策略来限制一个网页文档或脚本如何与不同源的资源进行交互，以确保用户数据的安全性和隐私。

CORS通过在HTTP头中添加特定的信息，允许服务器指定哪些来源（域名）可以访问该资源，从而解决了这个问题。具体来说，当浏览器从一个域名向另一个域名发起请求时，服务器可以在响应头中添加Access-Control-Allow-Origin等信息，指定允许访问该资源的域名列表。

使用CORS可以使得Web应用程序在多个不同的域名之间进行交互，从而提高了Web应用程序的灵活性和可扩展性。同时，它也能够帮助开发人员更好地保护用户的隐私和安全。

## 你能描述渐进增强 (progressive enhancement) 和优雅降级 (graceful degradation) 之间的不同吗?

渐进增强和优雅降级是两种不同的设计策略，用于创建可访问性更广泛的网站。

渐进增强 (Progressive Enhancement) 是一种设计方法，它从最基本的、最核心的功能开始，逐渐增加更高级别的功能。这样，网站可以在较低级别的设备、浏览器和网络条件下正常运行。当设备、浏览器和网络条件变得更好时，网站可以提供更高级别的功能和更好的用户体验。渐进增强的核心思想是始终优先考虑最基本的需求，并在此基础上进行扩展。

优雅降级 (Graceful Degradation) 是另一种设计方法，它从最高级别的功能开始设计，逐渐向下兼容，以支持低级别的设备、浏览器和网络条件。这样，即使设备或浏览器不支持某些高级功能，用户也可以访问网站的基本内容。优雅降级的核心思想是尽可能地提供最好的用户体验，但也要有备用方案，以应对可能的问题。

渐进增强和优雅降级之间的区别在于它们的核心思想和设计方法。渐进增强是从基础开始，逐渐向上升级，而优雅降级是从高级别开始，逐渐向下降级。两种方法都可以用于创建适应性更强的网站，但是渐进增强更适合新项目和开发团队不断迭代的情况，而优雅降级则更适合旧项目和需要大量兼容性测试的情况。

## 你如何对网站的文件和资源进行优化？

以下是我对网站文件和资源进行优化的一些常见方法：

1. 压缩和合并文件：对CSS、JavaScript和HTML等文件进行压缩和合并，以减少文件大小和数量，提高网站的加载速度。
2. 图片优化：对图片进行压缩和优化，减小图片文件的大小，提高网站的加载速度。还可以使用响应式图片或者图像集合等技术，根据设备或者分辨率加载不同的图片。
3. 使用CDN：使用内容分发网络（CDN）来分发网站的静态资源，以提高网站的加载速度，减少带宽消耗和服务器负载。
4. 延迟加载：将页面上不必要的资源（如图片和视频）延迟加载，以提高网站的性能和用户体验。这可以通过使用Lazy Loading技术来实现。
5. 压缩缓存：设置HTTP头来压缩和缓存文件，以减少每个页面的请求次数，提高网站的性能。
6. 选择适当的格式：对于不同类型的文件，选择最适合的格式，以减小文件大小并提高加载速度。例如，对于矢量图像，可以使用SVG格式，而对于简单的动画，可以使用CSS3动画代替JavaScript。
7. 减少HTTP请求：减少页面中的HTTP请求次数，可以通过合并CSS和JavaScript文件、使用CSS Sprites等技术来实现。
8. 删除不必要的代码：删除不必要的、未使用的、过时的或重复的代码，可以减小文件大小，提高网站的加载速度和性能。

以上这些优化方法可以帮助我们减少网站文件和资源的大小和数量，提高网站的加载速度和性能，从而提高用户体验和搜索引擎排名。

## 请解释 CSS 动画和 JavaScript 动画的优缺点。

CSS动画和JavaScript动画都是实现网页动画的常用技术，它们各有优缺点。

CSS动画的优点：

1. 相对较简单：CSS动画的语法比JavaScript动画简单，容易上手。
2. 性能较好：CSS动画是由浏览器本身来处理的，因此可以避免由于JavaScript动画所带来的性能问题，尤其是在移动设备上。
3. 硬件加速：现代浏览器支持硬件加速，可以使CSS动画更流畅。
4. 代码可读性：由于CSS动画是声明式的，因此代码的可读性较高，易于维护。

CSS动画的缺点：

1. 限制较多：CSS动画只能使用一些预定义的属性和关键帧来实现，因此在一些需要复杂动画效果的场景下可能不够灵活。
2. 兼容性：CSS动画的兼容性可能存在问题，特别是在一些旧版浏览器上。
3. 交互性不够：由于CSS动画没有JavaScript动画的事件回调机制，因此无法实现一些更复杂的交互效果。

JavaScript动画的优点：

1. 灵活性强：JavaScript动画可以使用任何属性和方法来实现，因此在实现复杂动画效果时更加灵活。
2. 交互性强：JavaScript动画可以使用事件回调来实现更复杂的交互效果，比如鼠标悬停、点击等。
3. 兼容性好：JavaScript动画可以兼容到较旧的浏览器版本。

JavaScript动画的缺点：

1. 性能问题：JavaScript动画需要浏览器进行解释和执行，可能会带来性能问题，尤其是在移动设备上。
2. 代码可读性：JavaScript动画需要编写大量的代码，因此代码可读性不如CSS动画。
3. 开发难度高：JavaScript动画需要掌握一定的编程技能，对于非开发人员来说可能难以掌握。

总之，CSS动画和JavaScript动画都有各自的优缺点，在实际开发中应该根据需要和情况选择合适的技术来实现动画效果。在性能要求高和兼容性要求高的场景下，建议优先选择CSS动画。而在交互性要求高和灵活性要求高的场景下，建议优先选择JavaScript动画。

## 什么是闭包 (closure)，如何使用它，为什么要使用它？以及它的优缺点

在JavaScript中，闭包是指函数可以访问它所在的词法作用域以及它上层的词法作用域中的变量，即使外部函数已经执行完毕，这些变量仍然可以被访问和使用。闭包通常用于在函数内部创建私有变量和函数。

使用闭包，可以创建一个安全的作用域，隐藏一些私有变量和函数，防止它们被外部代码访问和篡改。同时，闭包也可以帮助我们实现一些高阶函数，例如柯里化、惰性求值、函数组合等，这些技术可以使代码更加简洁和高效。

下面是一个使用闭包的例子：

```
function counter() {
  let count = 0;

  function increment() {
    count++;
    console.log(count);
  }

  function decrement() {
    count--;
    console.log(count);
  }

  return {
    increment,
    decrement
  }
}

const c = counter();
c.increment(); // 输出1
c.increment(); // 输出2
c.decrement(); // 输出1
```

在上面的例子中，我们定义了一个`counter`函数，它返回一个包含两个方法`increment`和`decrement`的对象。这两个方法都可以访问`count`变量，因为它们被定义在同一个闭包中，而且它们的词法作用域链都包含了`count`变量。

通过使用闭包，我们可以创建一个独立的计数器，它的状态被封装在函数内部，外部代码无法直接访问和修改它。这种技术可以帮助我们编写更加模块化、安全、可复用的代码。



闭包是一种强大的编程技术，但是它也有一些优点和缺点，下面是一些常见的优点和缺点。

优点：

1. 实现模块化：闭包可以帮助我们创建模块化的代码，封装私有变量和函数，避免命名冲突和全局污染。
2. 避免变量污染：闭包可以帮助我们创建独立的作用域，避免变量被外部代码访问和修改，增强代码的安全性和可维护性。
3. 实现高阶函数：闭包可以帮助我们实现一些高阶函数，例如柯里化、惰性求值、函数组合等，这些技术可以使代码更加简洁和高效。

缺点：

1. 内存泄漏：如果不恰当地使用闭包，可能会导致内存泄漏问题。由于闭包会保留对外部变量的引用，如果闭包函数的生命周期比外部变量长，就会造成内存泄漏。
2. 性能问题：由于闭包需要维护词法作用域链，可能会带来一些性能问题，尤其是在嵌套的函数中使用闭包时。
3. 容易造成代码混乱：闭包可以使代码变得难以理解和维护，特别是在多层嵌套的情况下。过度使用闭包可能会导致代码结构复杂、可读性差和难以调试的问题。

因此，在使用闭包时，需要注意内存管理和性能优化，避免出现潜在的问题。同时，要合理使用闭包，避免过度使用造成代码混乱和可维护性差的问题。

## 请举出一个匿名函数的典型用例？

匿名函数是一种没有名称的函数，它通常用于以下情况：

1. 作为回调函数：匿名函数经常被用作回调函数，当某个事件发生时，匿名函数就会被执行。例如，在JavaScript中，我们可以使用匿名函数来响应按钮点击事件、Ajax请求完成事件等。

```
javascriptCopy codedocument.querySelector('#my-button').addEventListener('click', function() {
  // 这里是匿名函数，响应按钮点击事件
});
```

1. 自执行函数：匿名函数可以用来创建一个立即执行的函数，也叫自执行函数。这种技术通常用于创建私有作用域或者初始化代码。自执行函数可以避免全局变量的污染，并且不会干扰其他代码的执行。

```
(function() {
  // 这里是自执行函数，用于创建私有作用域或初始化代码
})();
```

1. 作为闭包：匿名函数可以被用作闭包，用于创建独立的作用域并封装私有变量和方法。闭包可以实现模块化、高阶函数等编程技术。

```
function counter() {
  var count = 0;
  return function() {
    // 这里是匿名函数，作为闭包来封装私有变量和方法
    count++;
    console.log(count);
  }
}
var c = counter();
c(); // 输出 1
c(); // 输出 2
```

这些都是匿名函数的常见用例，但并不是所有情况都适合使用匿名函数，需要根据具体的应用场景来决定是否使用匿名函数。

## 你是如何组织自己的代码？是使用模块模式，还是使用经典继承的方法？

我通常使用模块模式来组织代码，因为它可以创建一个独立的作用域，避免了全局变量的污染，同时还可以封装私有变量和方法。模块模式使用一个函数来包裹代码，并返回一个公共接口，用于与外部交互。

例如，下面是一个使用模块模式来组织代码的示例：

```
var myModule = (function() {
  // 私有变量和方法
  var privateVar = 0;
  function privateMethod() {
    console.log('private method');
  }
  
  // 公共接口
  return {
    publicVar: 1,
    publicMethod: function() {
      console.log('public method');
    }
  };
})();
```

这个模块定义了一个私有变量和方法，以及一个公共接口，通过返回一个对象来实现模块的封装和公开。

当然，如果在需要使用面向对象编程的场景下，我也会使用经典继承的方法来组织代码。经典继承使用构造函数和原型链来创建对象，可以方便地实现继承和多态。

总的来说，我会根据具体的应用场景来决定采用哪种组织代码的方式。如果是需要封装私有变量和方法、创建独立作用域的情况下，我会使用模块模式；如果是需要实现继承和多态的情况下，我会使用经典继承的方式。

## 请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？

在 JavaScript 中，原生对象（Native objects）指的是由 ECMAScript 标准规定的对象类型，如 Array、Date、Math 等。它们是 JavaScript 语言本身所提供的对象，提供了 JavaScript 的基本功能。

而宿主对象（Host objects）则是由宿主环境（如浏览器或 Node.js）提供的对象，例如在浏览器中的 window 对象、document 对象、XMLHttpRequest 对象等等。这些宿主对象并不由 ECMAScript 规范定义，而是由浏览器或 Node.js 等运行环境自行定义和实现的。

这两种对象之间的主要区别在于它们的实现方式和功能特性。原生对象是由 JavaScript 语言本身所提供的，因此它们在不同的 JavaScript 引擎中具有相同的行为。而宿主对象则是由不同的宿主环境提供的，因此它们的实现方式和行为特性可能会因环境而异。

另外，宿主对象还具有一些 JavaScript 标准中未定义的功能，比如浏览器提供的 DOM 操作和 XMLHttpRequest 对象等。同时，由于宿主对象的行为和功能特性可能会因环境而异，因此在编写跨平台的 JavaScript 代码时，需要格外注意宿主对象的使用。

## 请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？

以下是三个代码片段的区别：

1. `function Person(){}` 是一个构造函数，它定义了一个名为 `Person` 的函数。
2. `var person = Person()` 创建了一个变量 `person`，并将它赋值为调用 `Person` 函数的结果。由于 `Person` 函数并没有返回任何值，因此 `person` 的值将是 `undefined`。这种方式创建的对象并不是通过 `Person` 构造函数创建的，因此它不是一个 `Person` 类型的实例对象。
3. `var person = new Person()` 通过 `new` 关键字创建了一个新的 `Person` 实例对象，并将它赋值给 `person` 变量。这个新对象被创建时，它继承了 `Person` 原型对象上的所有属性和方法，并且可以调用 `Person` 构造函数中的代码来初始化自身的状态。这种方式创建的对象是通过 `Person` 构造函数创建的 `Person` 类型的实例对象。

因此，第一个代码片段定义了一个构造函数，第二个代码片段返回了 `undefined`，而第三个代码片段创建了一个新的 `Person` 实例对象。