import{_ as n,o as s,c as a,a as e}from"./app-ec29cce2.js";const o={},p=e(`<p>对于 this 的误解有两个:</p><ul><li>认为<code>this</code>指向的对象是自己</li><li>是<code>this</code>它不知怎的指向了函数的作用域</li></ul><p>对于第一点,<code>this</code>在字面意思上可能是是自己,但这是个误解,this 实际上是在函数被调用时建立的一个绑定，它指向 什么 是完全由函数被调用的<em>调用点</em>(函数在代码中被调用的位置)来决定的。</p><p>第二点在理解时好像<code>this</code>指向了模有一个函数的作用域,要知道<em>this 不会以任何方式指向函数的 词法作用域</em>,因为这是引擎内部是这样是实现的</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我要查找<code>this.a</code>的值时候是找不到的,所以<em>你不能使用 this 引用在词法作用域中查找东西</em> 还要注意:</p><ul><li><code>this</code> 不是编写时绑定,而是运行时绑定,它依赖于函数调用的上下文条件.</li><li><code>this</code> 绑定与函数声明的位置没有任何关系,而与函数被调用的方式紧密相连.</li></ul><p>在我们查找 this 的指向时是由四种规则适用的,按照优先级排列分别是:</p><ul><li>new 绑定: 函数通过<code>new 关键字</code>被调用的,<code>this</code>指向这个心被创建的对象</li><li>明确绑定: 函数是通过 <code>call</code>,<code>apply</code>,<code>bind</code>调用,<code>this</code>指向那个被明确指明的对象</li><li>隐含绑定: 函数是通过环境对象被调用的,<code>this</code>指向那个环境对象(<code>let foo = obj.foo</code>)</li><li>默认绑定: 函数正常执行,使用默认的<code>this</code>,此时<code>this</code>指向全局(<code>window</code>),但是在严格模式(<code>strict mode</code>)下,<code>this</code>为 <code>undefined</code></li></ul><p>new 绑定:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Foo</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> arg
<span class="token punctuation">}</span>

<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>明确绑定:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>隐含绑定:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">foo</span><span class="token operator">:</span> foo<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认绑定:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">123</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">// 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),t=[p];function c(i,l){return s(),a("div",null,t)}const d=n(o,[["render",c],["__file","guanyuthis.html.vue"]]);export{d as default};
