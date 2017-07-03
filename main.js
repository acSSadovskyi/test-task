
        

        import {GraphicsData, Graphics, Polygon, Circle, Point} from 'pixi.js';
        import {updateWindow, computeShapeArea} from './Utils';
        import Controler from './Controler';
        import Renderer from './WebGLRenderer';
        import SHAPES from './ShapeTypes';
        import Shape from './Shape';
        import ShapesManager from './ShapesManager';
        import {vec2, mat2} from 'gl-matrix';

        function main()
        {
            let canvas = document.querySelector("#canvas");
            let renderer = new Renderer(800, 500, canvas, true);
            let sm = new ShapesManager(renderer, 1);
            Shape.precomputeShapesAreas();
            let controler = new Controler(sm);
            controler.bindPrimaryEvents();

            function loop()
            {
                sm.updateShapes();
                renderer.render();
                requestAnimationFrame(loop);    
            }

            updateWindow(renderer);
            loop(); 
            
            window.addEventListener('resize', () => updateWindow(renderer));
        }

        window.addEventListener('load', main);

        
        

