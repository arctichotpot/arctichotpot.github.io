import{_ as n,o as s,c as a,a as e}from"./app-ec29cce2.js";const t={},c=e(`<h2 id="函数声明与函数表达式" tabindex="-1"><a class="header-anchor" href="#函数声明与函数表达式" aria-hidden="true">#</a> 函数声明与函数表达式</h2><p>在创建函数的时候有两种方式,一种是<strong>函数声明</strong>,另一种是<strong>函数表达式</strong>,ECMA规定了一点,函数声明必须要带着 <strong>标识符</strong>(函数名),函数表达式则可以忽略掉标识符.</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 函数声明 : </span>

<span class="token keyword">function</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token punctuation">.</span>
    <span class="token keyword">return</span> someValue
<span class="token punctuation">}</span>

<span class="token comment">// 函数表达式 :</span>

<span class="token keyword">const</span> <span class="token function-variable function">fun</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token punctuation">.</span>
    <span class="token keyword">return</span> someValue
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此可见,如果 <em>函数如果是作为一个赋值表达式的一部分的话,他就是一个函数表达式,但是如果被包含在一个函数体内或程序内的话他就是一个函数声明</em></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 函数声明 ,因为他放在了程序文件中</span>

<span class="token keyword">const</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 函数表达式,因为他作为赋值表达式的一部分</span>

<span class="token keyword">new</span> <span class="token class-name">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 函数表达式,他作为new表达式的一部分</span>

<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 函数声明，因为它是函数体的一部分</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而且他们在执行过程中也有着细微差别,当程序在执行时的时候,函数声明会提前声明(会在程序开始运行前被解析,也就是我们常见的<strong>函数提升</strong>,函数在JavaScript中是一等公民)</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&quot;hello&quot;</span>
<span class="token punctuation">}</span>
 <span class="token comment">// hello</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的<code>func</code>函数会被提升到当前程序顶部提前声明,所以会打印<code>hello</code></p><p>还有一种比较特别的例子是函数语句出现在<code>块级作用域中的时候</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 这里其实被当作的函数表达式来执行的</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行过程中其实是把他当作函数表达式来执行的(<em><strong>当在块级作用域中的时候,允许函数声明,行为类似于var声明一个变量,而且函数会提升到当前跨级作用域开头</strong></em>),只不过是将<code>a</code>这个同名变量提升到了顶部,然后在执行的时候给这个同名变量进行赋值:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> func <span class="token operator">=</span> <span class="token keyword">undefined</span>

<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">2</span>
        <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>

<span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看这个:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
 a <span class="token operator">=</span> <span class="token number">123</span>
 <span class="token keyword">function</span> <span class="token function">a</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>

<span class="token comment">// 123</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行过程类似这样:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">undefined</span> <span class="token comment">// 先声明一个同名变量 a</span>
<span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">a</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 提升函数到当前块级作用域开头,给同名变量赋值</span>
    a <span class="token operator">=</span> <span class="token number">123</span>   <span class="token comment">// 重新给 a 赋值</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// 打印 123</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>扯一嘴 <code>var</code>声明变量,<code>var a = &quot;helloworld&quot;</code>会被引擎解析成</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token keyword">undefined</span> 
a<span class="token operator">=</span> <span class="token string">&quot;helloworld&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他注意点" tabindex="-1"><a class="header-anchor" href="#其他注意点" aria-hidden="true">#</a> 其他注意点</h2><h3 id="命名函数表达式" tabindex="-1"><a class="header-anchor" href="#命名函数表达式" aria-hidden="true">#</a> 命名函数表达式</h3><p>像是 <code>const a = function func(){}</code> 这样的函数表达式其实叫做<strong>命名函数表达式</strong>,这里的<code>func</code>这个函数名只会在函数内部才会有效</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">a</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token comment">// 打印函数  func(){console.log(func)}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token comment">// Uncaught ReferenceError: func is not defined</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),p=[c];function o(i,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","hanshubiaodashi.html.vue"]]);export{d as default};
