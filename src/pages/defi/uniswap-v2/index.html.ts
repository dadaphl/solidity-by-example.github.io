// metadata
export const version = "0.8.3"
export const title = "Uniswap V2 Examples"
export const description = "Uniswap V2"

const html = `<h3 id="swap">Swap</h3>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.3;</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">"./Uniswap.sol"</span>;

<span class="hljs-class"><span class="hljs-keyword">contract</span> <span class="hljs-title">TestUniswap</span> </span>{
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">private</span> <span class="hljs-keyword">constant</span> UNISWAP_V2_ROUTER =
        <span class="hljs-number">0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D</span>;
    <span class="hljs-keyword">address</span> <span class="hljs-keyword">private</span> <span class="hljs-keyword">constant</span> WETH = <span class="hljs-number">0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">
        <span class="hljs-keyword">address</span> _tokenIn,
        <span class="hljs-keyword">address</span> _tokenOut,
        <span class="hljs-keyword">uint</span> _amountIn,
        <span class="hljs-keyword">uint</span> _amountOutMin,
        <span class="hljs-keyword">address</span> _to
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> </span>{
        IERC20(_tokenIn).transferFrom(<span class="hljs-built_in">msg</span>.<span class="hljs-built_in">sender</span>, <span class="hljs-keyword">address</span>(<span class="hljs-built_in">this</span>), _amountIn);
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);

        <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">memory</span> path;
        <span class="hljs-keyword">if</span> (_tokenIn == WETH || _tokenOut == WETH) {
            path = <span class="hljs-keyword">new</span> <span class="hljs-keyword">address</span>[](<span class="hljs-number">2</span>);
            path[<span class="hljs-number">0</span>] = _tokenIn;
            path[<span class="hljs-number">1</span>] = _tokenOut;
        } <span class="hljs-keyword">else</span> {
            path = <span class="hljs-keyword">new</span> <span class="hljs-keyword">address</span>[](<span class="hljs-number">3</span>);
            path[<span class="hljs-number">0</span>] = _tokenIn;
            path[<span class="hljs-number">1</span>] = WETH;
            path[<span class="hljs-number">2</span>] = _tokenOut;
        }

        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            <span class="hljs-built_in">block</span>.<span class="hljs-built_in">timestamp</span>
        );
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAmountOutMin</span>(<span class="hljs-params">
        <span class="hljs-keyword">address</span> _tokenIn,
        <span class="hljs-keyword">address</span> _tokenOut,
        <span class="hljs-keyword">uint</span> _amountIn
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>) </span>{
        <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">memory</span> path;
        <span class="hljs-keyword">if</span> (_tokenIn == WETH || _tokenOut == WETH) {
            path = <span class="hljs-keyword">new</span> <span class="hljs-keyword">address</span>[](<span class="hljs-number">2</span>);
            path[<span class="hljs-number">0</span>] = _tokenIn;
            path[<span class="hljs-number">1</span>] = _tokenOut;
        } <span class="hljs-keyword">else</span> {
            path = <span class="hljs-keyword">new</span> <span class="hljs-keyword">address</span>[](<span class="hljs-number">3</span>);
            path[<span class="hljs-number">0</span>] = _tokenIn;
            path[<span class="hljs-number">1</span>] = WETH;
            path[<span class="hljs-number">2</span>] = _tokenOut;
        }

        <span class="hljs-comment">// same length as path</span>
        <span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> amountOutMins = IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(
            _amountIn,
            path
        );

        <span class="hljs-keyword">return</span> amountOutMins[path.<span class="hljs-built_in">length</span> - <span class="hljs-number">1</span>];
    }
}
</code></pre>
<h3 id="interfaces">Interfaces</h3>
<pre><code class="language-solidity"><span class="hljs-comment">// SPDX-License-Identifier: MIT</span>
<span class="hljs-meta"><span class="hljs-keyword">pragma</span> <span class="hljs-keyword">solidity</span> ^0.8.3;</span>

<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IERC20</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">totalSupply</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">balanceOf</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> account</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title"><span class="hljs-built_in">transfer</span></span>(<span class="hljs-params"><span class="hljs-keyword">address</span> recipient, <span class="hljs-keyword">uint</span> amount</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">allowance</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> owner, <span class="hljs-keyword">address</span> spender</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">approve</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> spender, <span class="hljs-keyword">uint</span> amount</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transferFrom</span>(<span class="hljs-params">
        <span class="hljs-keyword">address</span> sender,
        <span class="hljs-keyword">address</span> recipient,
        <span class="hljs-keyword">uint</span> amount
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">bool</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">event</span> <span class="hljs-title">Transfer</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> <span class="hljs-keyword">indexed</span> <span class="hljs-keyword">from</span>, <span class="hljs-keyword">address</span> <span class="hljs-keyword">indexed</span> to, <span class="hljs-keyword">uint</span> value</span>)</span>;
    <span class="hljs-function"><span class="hljs-keyword">event</span> <span class="hljs-title">Approval</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> <span class="hljs-keyword">indexed</span> owner, <span class="hljs-keyword">address</span> <span class="hljs-keyword">indexed</span> spender, <span class="hljs-keyword">uint</span> value</span>)</span>;
}

<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IUniswapV2Router</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAmountsOut</span>(<span class="hljs-params"><span class="hljs-keyword">uint</span> amountIn, <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">memory</span> path</span>)
        <span class="hljs-title"><span class="hljs-keyword">external</span></span>
        <span class="hljs-title"><span class="hljs-keyword">view</span></span>
        <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> amounts</span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapExactTokensForTokens</span>(<span class="hljs-params">
        <span class="hljs-keyword">uint</span> amountIn,
        <span class="hljs-keyword">uint</span> amountOutMin,
        <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">calldata</span> path,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">uint</span> deadline
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> amounts</span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapExactTokensForETH</span>(<span class="hljs-params">
        <span class="hljs-keyword">uint</span> amountIn,
        <span class="hljs-keyword">uint</span> amountOutMin,
        <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">calldata</span> path,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">uint</span> deadline
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> amounts</span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapExactETHForTokens</span>(<span class="hljs-params">
        <span class="hljs-keyword">uint</span> amountOutMin,
        <span class="hljs-keyword">address</span>[] <span class="hljs-keyword">calldata</span> path,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">uint</span> deadline
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">payable</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span>[] <span class="hljs-keyword">memory</span> amounts</span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addLiquidity</span>(<span class="hljs-params">
        <span class="hljs-keyword">address</span> tokenA,
        <span class="hljs-keyword">address</span> tokenB,
        <span class="hljs-keyword">uint</span> amountADesired,
        <span class="hljs-keyword">uint</span> amountBDesired,
        <span class="hljs-keyword">uint</span> amountAMin,
        <span class="hljs-keyword">uint</span> amountBMin,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">uint</span> deadline
    </span>)
        <span class="hljs-title"><span class="hljs-keyword">external</span></span>
        <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params">
            <span class="hljs-keyword">uint</span> amountA,
            <span class="hljs-keyword">uint</span> amountB,
            <span class="hljs-keyword">uint</span> liquidity
        </span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeLiquidity</span>(<span class="hljs-params">
        <span class="hljs-keyword">address</span> tokenA,
        <span class="hljs-keyword">address</span> tokenB,
        <span class="hljs-keyword">uint</span> liquidity,
        <span class="hljs-keyword">uint</span> amountAMin,
        <span class="hljs-keyword">uint</span> amountBMin,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">uint</span> deadline
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">uint</span> amountA, <span class="hljs-keyword">uint</span> amountB</span>)</span>;
}

<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IUniswapV2Pair</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">token0</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">address</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">token1</span>(<span class="hljs-params"></span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">address</span></span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getReserves</span>(<span class="hljs-params"></span>)
        <span class="hljs-title"><span class="hljs-keyword">external</span></span>
        <span class="hljs-title"><span class="hljs-keyword">view</span></span>
        <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params">
            <span class="hljs-keyword">uint112</span> reserve0,
            <span class="hljs-keyword">uint112</span> reserve1,
            <span class="hljs-keyword">uint32</span> blockTimestampLast
        </span>)</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">
        <span class="hljs-keyword">uint</span> amount0Out,
        <span class="hljs-keyword">uint</span> amount1Out,
        <span class="hljs-keyword">address</span> to,
        <span class="hljs-keyword">bytes</span> <span class="hljs-keyword">calldata</span> data
    </span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span></span>;
}

<span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">IUniswapV2Factory</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPair</span>(<span class="hljs-params"><span class="hljs-keyword">address</span> token0, <span class="hljs-keyword">address</span> token1</span>) <span class="hljs-title"><span class="hljs-keyword">external</span></span> <span class="hljs-title"><span class="hljs-keyword">view</span></span> <span class="hljs-title"><span class="hljs-keyword">returns</span></span> (<span class="hljs-params"><span class="hljs-keyword">address</span></span>)</span>;
}
</code></pre>
<h3 id="links">Links</h3>
<p><a href="https://cryptoradar.co/guide/uniswap">What is Uniswap? Everything You Need To Know</a></p>
`

export default html
