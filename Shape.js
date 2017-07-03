


        import {Graphics, GraphicsData, Polygon, Circle, Ellipse, Point} from 'pixi.js';
        import {vec2, mat2} from 'gl-matrix';
        import SHAPES from './ShapeTypes';
        import {computeShapeArea} from './Utils';
        
        class Shape extends Graphics
        {
            /**
             * @param {Polygon | Circle | Ellipse} data 
             * @param {number} [color]
             * @param {SHAPES} type
             * @param {Point | {x: number, y: number}} [position]
             */

            constructor(data, type, color, position)
            {
                super();
                
                if(type === SHAPES.RANDOM)
                    Shape._drawRanodomShape(this, data);
                else
                {
                    this.lineStyle(1, 0x000000);
                    this.drawShape(data);
                    this.closePath();
                }

                this.graphicsData.forEach(gData => gData.fill = true); 
                if(color)
                    this.graphicsData.forEach(gData => gData.fillColor = color);
                    
                this.type = type;

                if(position)
                {
                    if(position instanceof Point)
                        this.position = position;
                    else
                        this.position.set(position.x, position.y);
                }

                this.area = null;
                if(Shape.shapesAreas)
                    this.area = Shape.shapesAreas.get(type);
            };

            /** @param {number} color */
            changeColor(color)
            {
                this.graphicsData.forEach(gData => gData.fillColor = color);
                this.dirty++;
                this.clearDirty++;
            };

            updateArea()
            {
                if(this.area)
                {
                    this.area *= (this.scale.x * this.scale.y);
                    this.area = Math.round(this.area);
                }      
            }

            static _drawRanodomShape(shape, randomModel)
            {
                let angle = 2 * Math.PI / randomModel.sectorNum;
                let start_point = [randomModel.sectorWidth, 0];
                
                for (let i = 0; i < randomModel.sectorNum; i++) 
                {
                    let rot = mat2.create();
                    mat2.fromRotation(rot, angle);

                    let v1 = vec2.fromValues(start_point[0], start_point[1]);
                    let v2 = vec2.create();
                    vec2.transformMat2(v2, v1, rot);

                    let vec_midl = vec2.create();
                    mat2.fromRotation(rot, angle / 2);
                    vec2.transformMat2(vec_midl, v1, rot);
                    vec2.scale(vec_midl, vec_midl, Math.random() + 1);

                    shape.moveTo(0, 0);
                    shape.lineTo(v1[0], v1[1]);
                    shape.lineTo(v2[0], v2[1]);
                    shape.lineStyle(1, 0x000000);                    
                    shape.moveTo(0, 0);
                    shape.moveTo(v1[0], v1[1]);
                    shape.quadraticCurveTo(vec_midl[0], vec_midl[1], v2[0], v2[1]);
                    shape.lineAlpha = 0;
                    start_point = [v2[0], v2[1]];
                }
            };

            static precomputeShapesAreas()
            {
                Shape.shapesAreas = new Map();
                let typeKeys = Reflect.ownKeys(SHAPES);
                for(let type of typeKeys)
                    Shape.shapesAreas.set(SHAPES[type], computeShapeArea(SHAPES[type]));
            }
        };

        export default Shape;