


        import {WebGLRenderer, CanvasRenderer, Container} from 'pixi.js';

        class Renderer extends WebGLRenderer
        {
            /**
             * @param {number} width 
             * @param {number} height 
             * @param {HTMLCanvasElement} view
             * @param {boolean} transparent 
             */
            constructor(width, height, view, transparent)
            {
                super({width, height, view, transparent, antialias: true});
                this.mainStage = new Container();
                this.shapesNumView = document.querySelector("#shapes-view");
                this.totalAreaView = document.querySelector("#area-view");
                this.shapesPerSecondView = document.querySelector("#sps-view");
                this.gravityValView = document.querySelector("#gravity-view");
            };
        
            /**
             * 
             * @param {HTMLElement} element 
             * @param {string} value 
             */
            renderHTMLView(element, value)
            {
                element.innerHTML = value;
            };

            render()
            {
               super.render(this.mainStage);
            };
        };

        
        export default Renderer;
            


