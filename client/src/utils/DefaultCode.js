export const DEFAULT_CODE
    = `<!doctype html>
    <html>
        <style>
            body {
                margin: 0;
                display: grid;
                place-items:center;
                height: 100vh;
                font-famiily: system-ui, sans-serif;
                background: #0a1220;
                color: #e8edf5;
            }
                h1 {
                    font-size: 1.5rem;
                    margin: 0 0 12px;
                }
                button {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: none;
                    background: #45d8c0;
                    color: #04211c;
                    font-weight: 600;
                    cursor: pointer;
                }
        </style>
        <body>
            <div style="text-align:center" >
                <h1>Hello, dock 👋</h1>
                <button onClick="this.textContent" = 'Shipped! - dummy bro' >
                    Deploy
                </button>
            </div>
        </body>
    </html>
    `