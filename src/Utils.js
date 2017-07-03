
        

        import {Point} from 'pixi.js';
        import {vec2} from 'gl-matrix';
        import SHAPES from './ShapeTypes';
        import Models from './ShapeModels';

        function initShapesStore(shapeTypes)
        {
            /**
             * @type {Map<SHAPES, Set<Shape>>}
             */
            let store = new Map();
            
            for(let type in shapeTypes)
                store.set(shapeTypes[type], new Set());

            return store;
        }

        function genRandomColor()
        {
            let color = 0;
            for (let i = 0; i <= 2; i++) 
            {
                let colorComp = Math.floor(Math.random() * 255);
                color = ((color << 8) | colorComp);
            }

            return color
        }

        /**
         * @return {SHAPES}
         */
        function genRandomShapeType()
        {
            let index = Math.round(Math.random() * 6);
            return SHAPES[Reflect.ownKeys(SHAPES)[index]];
        }
        
        /**
         * 
         * @param {number} shapeWidth 
         * @param {number} shapeHeight
         * @param {number} canvasWidth 
         * @param {number} canvasHeight 
         */
        function genRandomPosition(shapeWidth, shapeHeight, canvasWidth, canvasHeight)
        {
            let edgeLeftSide = shapeWidth / 2;
            let edgeRightSide = canvasWidth - shapeWidth;
            let edgeTopSide = shapeHeight / 2;
            let edgeBottomSide = canvasHeight - shapeHeight;
            
            let x = Math.floor(Math.random() * edgeRightSide + edgeLeftSide);
            let y = Math.floor(Math.random() * edgeBottomSide + edgeTopSide);
            
            return new Point(x, y);
        };

        /**
         * 
         * @param {Renderer} renderer 
         */
        function updateWindow(renderer)
        {
            let windowHeight = window.innerHeight;

            if(renderer) 
            {
                let canvas = renderer.view;
                let canvasHeight = canvas.height;
                
                if(windowHeight < 760)
                {
                    canvas.style.height = "500px";
                    canvasHeight = 500;
                }
                else
                {
                    canvas.style.height = "600px";
                    canvasHeight = 600;
                }

                renderer.resize(800, canvasHeight);  
            }
        }

        /** @param {SHAPES} shapeType */
        function computeShapeArea(shapeType)
        {
            let model = Models.get(shapeType);
            let area = null, data = null;
            switch(shapeType)
            {
                case SHAPES.TRIANGLE:
                    data = model.points;
                    area = computeTriangleArea([[data[0], data[1]], [data[2], data[3]], [data[4], data[5]]]);
                break;

                case SHAPES.SQUARE:
                    data = model.points;
                    let w = vec2.fromValues(data[0] - data[2], data[1] - data[3]);
                    let h = vec2.fromValues(data[0] - data[6], data[1] - data[7]);
                    area = vec2.length(w) * vec2.length(h);
                break;

                case SHAPES.PENTAGON:
                case SHAPES.HEXAGON:
                    let triangles = decompPolygon(model.points);
                    triangles.forEach(triangle => {area += computeTriangleArea(triangle)});
                break;

                case SHAPES.CIRCLE:
                    area = Math.PI * Math.pow(model.radius, 2);
                break;

                case SHAPES.ELLIPSE:
                    area = Math.PI * (model.width * model.height) / 4;
                break;

                case SHAPES.RANDOM:
                    area = Math.PI * Math.pow(model.sectorWidth, 2);
                break;
            }

            return Math.round(area);
        }

        function computeTriangleArea(td)
        {
            let a = vec2.fromValues(td[0][0] -td[1][0], td[0][1] -td[1][1]);
            let b = vec2.fromValues(td[0][0] - td[2][0], td[0][1] - td[2][1]);
            let c = vec2.fromValues(td[1][0] - td[2][0], td[1][1] - td[2][1]);

            let a_length = vec2.length(a);
            let b_length = vec2.length(b);
            let c_length = vec2.length(c);
            let p = (a_length + b_length + c_length) / 2;
            
            return Math.sqrt(p * (p - a_length) * (p - b_length) * (p - c_length));
        }

        function decompPolygon(polygon)
        {
            let triangles = Array();
            let pl = polygon.length;

            for(let i = 0; i < pl - 3; i += 2)
            {
                let triangle = Array(), a = Array(), b = Array(), c = Array();
                
                a.push(0, 0);
                b.push(polygon[i], polygon[i + 1]);
                c.push(polygon[i + 2], polygon[i + 3]);

                triangle.push(a, b, c);
                triangles.push(triangle);
            }

            let lastTriangle = Array();
            lastTriangle.push(Array(0, 0));
            lastTriangle.push(Array(polygon[pl - 2], polygon[pl -1]));
            lastTriangle.push(Array(polygon[0], polygon[1]));
            triangles.push(lastTriangle);

            return triangles;
        }

        export {
                initShapesStore, 
                genRandomColor, 
                genRandomShapeType, 
                genRandomPosition, 
                updateWindow, 
                computeTriangleArea,
                decompPolygon,
                computeShapeArea
        };