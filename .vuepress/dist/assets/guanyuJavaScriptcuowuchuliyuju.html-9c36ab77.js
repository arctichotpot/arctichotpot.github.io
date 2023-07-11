import{_ as n,o as s,c as a,a as e}from"./app-ec29cce2.js";const t={},p=e(`<ul><li><strong>try</strong> 语句测试代码块的错误。</li><li><strong>catch</strong> 语句处理错误。</li><li><strong>throw</strong> 语句创建自定义错误。</li><li><strong>finally</strong> 语句在 try 和 catch 语句之后，无论是否有触发异常，该语句都会执行。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//try语句通常搭配catch语句来使用</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">{</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token comment">//比如</span>
<span class="token keyword">try</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">logg</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token comment">//程序会在这里停止执行</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">321</span><span class="token punctuation">)</span><span class="token comment">//在上一句抛出异常后会执行 catch 中的语句,此时输出 321</span>
<span class="token punctuation">}</span>
  <span class="token comment">//321</span>
<span class="token comment">//或者后面常常也会配合 finally 一起使用</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">{</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span><span class="token punctuation">{</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token comment">//比如</span>
<span class="token keyword">try</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">logg</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token comment">//程序会在这里停止执行</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">321</span><span class="token punctuation">)</span><span class="token comment">//在上一句抛出异常后会执行 catch 中的语句,此时输出 321</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">456</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
  <span class="token comment">//321</span>
  <span class="token comment">//456</span>
<span class="token keyword">throw</span> 语句
<span class="token keyword">throw</span> 语句允许我们创建自定义错误。
正确的技术术语是：创建或抛出异常（exception）。
<span class="token comment">//比如</span>
<span class="token keyword">throw</span> hello

有时<span class="token punctuation">,</span><span class="token keyword">try</span><span class="token operator">...</span>catch<span class="token operator">...</span>语句也会和<span class="token keyword">throw</span>语句一起使用
<span class="token keyword">let</span> a<span class="token operator">=</span> <span class="token number">12</span>
<span class="token keyword">try</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token operator">===</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">&quot;值为空&quot;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isNaN</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">&quot;不是数字&quot;</span><span class="token punctuation">;</span>
   a <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token operator">&gt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">&quot;这个数字比10大&quot;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">&quot;这个数字比10小&quot;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

  <span class="token comment">//没有catch语句时,程序会中断,先执行finally语句,然后再抛出异常信息</span>
  <span class="token keyword">function</span> <span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;出错了……&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;此行不会执行&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;完成清理工作&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">cleansUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 完成清理工作</span>
<span class="token comment">// Uncaught Error: 出错了……</span>
<span class="token comment">//    at cleansUp (&lt;anonymous&gt;:3:11)</span>
<span class="token comment">//    at &lt;anonymous&gt;:10:1</span>


  <span class="token keyword">function</span> <span class="token function">idle</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&#39;result&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;FINALLY&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">idle</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// hello</span>
<span class="token comment">// FINALLY</span>
上面代码中，<span class="token keyword">try</span>代码块没有发生错误，而且里面还包括<span class="token keyword">return</span>语句，
但是finally代码块依然会执行。而且，这个函数的返回值还是result。

下面的例子说明，<span class="token keyword">return</span>语句的执行是排在finally代码之前，
只是等finally代码执行完毕后才返回。

<span class="token keyword">var</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> count<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">countUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 0</span>
count
<span class="token comment">// 1</span>
上面代码说明，<span class="token keyword">return</span>语句里面的count的值，是在finally代码块运行之前就获取了。

下面是finally代码块用法的典型场景。

<span class="token function">openFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">writeFile</span><span class="token punctuation">(</span>Data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handleError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
  <span class="token function">closeFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
上面代码首先打开一个文件，然后在<span class="token keyword">try</span>代码块中写入文件，如果没有发生错误，
则运行finally代码块关闭文件；一旦发生错误，则先使用catch代码块处理错误，
再使用finally代码块关闭文件。

下面的例子充分反映了<span class="token keyword">try</span><span class="token operator">...</span>catch<span class="token operator">...</span>finally这三者之间的执行顺序。

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> <span class="token string">&#39;bug&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 这句原本会延迟到 finally 代码块结束再执行</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 这句会覆盖掉前面那句 return</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
  <span class="token punctuation">}</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不会运行</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 0</span>
<span class="token comment">// 1</span>
<span class="token comment">// 3</span>

result
<span class="token comment">// false</span>
上面代码中，catch代码块结束执行之前，会先执行finally代码块。

catch代码块之中，触发转入finally代码块的标志，不仅有<span class="token keyword">return</span>语句，还有<span class="token keyword">throw</span>语句。

<span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token string">&#39;出错了！&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;捕捉到内部错误&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">throw</span> e<span class="token punctuation">;</span> <span class="token comment">// 这句原本会等到finally结束再执行</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 直接返回</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 此处不会执行</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;caught outer &quot;bogus&quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//  捕捉到内部错误</span>
上面代码中，进入catch代码块之后，一遇到<span class="token keyword">throw</span>语句，就会去执行finally代码块，
其中有<span class="token keyword">return</span> <span class="token boolean">false</span>语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了。

<span class="token keyword">try</span>代码块内部，还可以再使用<span class="token keyword">try</span>代码块。

<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    consle<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Hello world!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Finally&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Will I run?&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Finally</span>
<span class="token comment">// consle is not defined</span>
上面代码中，<span class="token keyword">try</span>里面还有一个<span class="token keyword">try</span>。内层的<span class="token keyword">try</span>报错（console拼错了），
这时会执行内层的finally代码块，然后抛出错误，被外层的catch捕获。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="javascript-原生错误类型" tabindex="-1"><a class="header-anchor" href="#javascript-原生错误类型" aria-hidden="true">#</a> JavaScript 原生错误类型</h1><h3 id="_1-syntaxerror-对象" tabindex="-1"><a class="header-anchor" href="#_1-syntaxerror-对象" aria-hidden="true">#</a> 1.SyntaxError 对象</h3><p><code>SyntaxError</code>对象是解析代码时发生的语法错误。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 变量名错误</span>
<span class="token keyword">var</span> 1a<span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Invalid or unexpected token</span>

<span class="token comment">// 缺少括号</span>
console<span class="token punctuation">.</span>log <span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Uncaught SyntaxError: Unexpected string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的错误，都是在语法解析阶段就可以发现，所以会抛出<code>SyntaxError</code>。第一个错误提示是“token 非法”，第二个错误提示是“字符串不符合要求”。</p><h3 id="_2-referenceerror-对象" tabindex="-1"><a class="header-anchor" href="#_2-referenceerror-对象" aria-hidden="true">#</a> 2.ReferenceError 对象</h3><p><code>ReferenceError</code>对象是引用一个不存在的变量时发生的错误。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用一个不存在的变量</span>
unknownVariable
<span class="token comment">// Uncaught ReferenceError: unknownVariable is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果赋值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 等号左侧不是变量
console.log() = 1
// Uncaught ReferenceError: Invalid left-hand side in assignment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码对函数<code>console.log</code>的运行结果赋值，结果引发了<code>ReferenceError</code>错误。</p><h3 id="_3-rangeerror-对象" tabindex="-1"><a class="header-anchor" href="#_3-rangeerror-对象" aria-hidden="true">#</a> 3.RangeError 对象</h3><p><code>RangeError</code>对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是<code>Number</code>对象的方法参数超出范围，以及函数堆栈超过最大值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 数组长度不得为负数
new Array(-1)
// Uncaught RangeError: Invalid array length




</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数堆栈超过最大值</p><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <img src="https://cdn.nlark.com/yuque/0/2020/png/514813/1605834029863-cadc914d-eafb-4fae-9112-c4bc8afdcd72.png#align=left&amp;display=inline&amp;height=281&amp;margin=[object Object]&amp;originHeight=281&amp;originWidth=1084&amp;size=0&amp;status=done&amp;style=none&amp;width=1084" alt=""></h3><h3 id="_4-typeerror-对象" tabindex="-1"><a class="header-anchor" href="#_4-typeerror-对象" aria-hidden="true">#</a> 4.TypeError 对象</h3><p><code>TypeError</code>对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用<code>new</code>命令，就会抛出这种错误，因为<code>new</code>命令的参数应该是一个构造函数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码的第二种情况，调用对象不存在的方法，也会抛出<code>TypeError</code>错误，因为<code>obj.unknownMethod</code>的值是<code>undefined</code>，而不是一个函数。</p><h3 id="_5-urierror-对象" tabindex="-1"><a class="header-anchor" href="#_5-urierror-对象" aria-hidden="true">#</a> 5.URIError 对象</h3><p><code>URIError</code>对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及<code>encodeURI()</code>、<code>decodeURI()</code>、<code>encodeURIComponent()</code>、<code>decodeURIComponent()</code>、<code>escape()</code>和<code>unescape()</code>这六个函数。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token string">&#39;%2&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// URIError: URI malformed</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-evalerror-对象" tabindex="-1"><a class="header-anchor" href="#_6-evalerror-对象" aria-hidden="true">#</a> 6.EvalError 对象</h3><p><code>eval</code>函数没有被正确执行时，会抛出<code>EvalError</code>错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。</p>`,27),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","guanyuJavaScriptcuowuchuliyuju.html.vue"]]);export{r as default};
