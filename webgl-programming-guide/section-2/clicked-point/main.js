const VSHADER_SOURCE = `
    attribute vec4 a_Position;

    void main () {
        gl_Position = a_Position;   // 设置坐标
        gl_PointSize = 10.0;        // 设置尺寸
    }
`;
    const FSHADER_SOURCE = `
    void main () {
        gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 ); // 设置颜色
    }
`;

function main () {

    /* 获取canvas元素 */
    const canvas = document.getElementById( "webgl" );

    /* 获取WebGL绘图上下文 */
    const gl = canvas.getContext( "webgl" );

    /* 初始化着色器 */
    initShaders( gl, VSHADER_SOURCE, FSHADER_SOURCE );

    /* 获取a_Position变量的存储地址 */
    const a_position = gl.getAttribLocation( gl.program, "a_Position" );

    /* 设置背景色 */
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    /* 注册鼠标点击事件 */
    const g_points = []; // 记录鼠标点击位置的数组

    canvas.addEventListener( "mousedown", event => {

        const rect = event.target.getBoundingClientRect();
        let x = event.clientX;
        let y = event.clientY;

        x = ( x - rect.left ) / canvas.width * 2 - 1;
        y = - ( ( y - rect.top ) / canvas.height * 2 - 1 );

        g_points.push( x, y );

        /* 设置背景色（默认情况下，WebGL会丢弃上一次的颜色缓冲区的结果） */
        gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        for ( let i = 0; i < g_points.length; i += 2 ) {

            const x = g_points[ i ];
            const y = g_points[ i + 1 ];

            gl.vertexAttrib4f( a_position, x, y, 0, 1 );
            gl.drawArrays( gl.POINTS, 0, 1 );

        }

    } );

}
