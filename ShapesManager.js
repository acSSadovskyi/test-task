
        

        import {Point} from 'pixi.js'
        import Models from './ShapeModels';
        import SHAPES from './ShapeTypes';
        import Shape from './Shape';
        import Cache from './Cache';
        import * as Utils from './Utils'
        
        class ShapesManager
        {
            /**
             * @param {Renderer} renderer 
             * @param {number} gravity 
             */
            constructor(renderer, gravity)
            {
                    this.renderer = renderer;
                    this._gravityValue = gravity;
                    this.shapesStore = Utils.initShapesStore(SHAPES);
                    this.shapeCache = new Cache(10);
                    this.shapeCache._data
                    this._spsValue = 0;
                    this._visibleShapesNum = 0;
                    this._totalShapesArea = 0;

                    /**@type {Set<Shape>} */
                    this.visibles = new Set();

                    this.onIncreaseGravityValue(this._gravityValue);
                    this.renderer.renderHTMLView(this.renderer.totalAreaView, `Area: ${this._totalShapesArea}`);
            };

            /**
             * 
             * @param {SHAPES} shapeType
             * @param {number} shapeColor 
             * @param {Point | {x: number, y: number}} [shapePosition]
             * @return {Shape}
             */
            createShape(shapeColor, shapePosition)
            {
                let shape = null, shapeType = null;
                if(shapePosition)
                {
                    shapeType = Utils.genRandomShapeType();
                    shape = new Shape(Models.get(shapeType), shapeType, shapeColor, shapePosition);
                    this.renderer.mainStage.addChild(shape);
                }
                else
                {
                    if(!this.shapeCache.isEmpty())
                    {
                        shape = this.shapeCache.get();
                        shapeType = shape.type;
                        shape.visible = true;
                    }
                    else
                    {
                        shapeType = Utils.genRandomShapeType();
                        shape = new Shape(Models.get(shapeType), shapeType);
                        this.renderer.mainStage.addChild(shape);
                    }
        
                    shape.changeColor(shapeColor);
                    
                }
                
                let scaleFactor = Math.random() + 1;
                shape.scale.set(scaleFactor, scaleFactor);
                shape.rotation = Math.random() * 2;
                shape.updateArea();

                this.shapesStore.get(shapeType).add(shape);
                this.visibles.add(shape);
                this.renderer.renderHTMLView(this.renderer.shapesNumView, `Shapes: ${++this._visibleShapesNum}`);  
                this.renderer.renderHTMLView(this.renderer.totalAreaView, `Area: ${this._totalShapesArea += shape.area}`);
                return shape;
            };

            /**
             * 
             * @param {number} [value]
             */
            onIncreaseSpsValue(value)
            {
                this._spsValue = (value !== undefined) ? value : ++this._spsValue;
                this.renderer.renderHTMLView(this.renderer.shapesPerSecondView, `Shapes per second: ${this._spsValue}`);
            };

            onDecreaseSpsValue()
            {
                if(this._spsValue)
                {
                    this._spsValue--;
                    this.renderer.renderHTMLView(this.renderer.shapesPerSecondView, `Shapes per second: ${this._spsValue}`);
                }
            };

            /**
             * 
             * @param {number} [value] 
             */
            onIncreaseGravityValue(value)
            {
                this._gravityValue = (value !== undefined) ? value : ++this._gravityValue;
                this.renderer.renderHTMLView(this.renderer.gravityValView, `Gravity: ${this._gravityValue}`);
            };

            onDecreaseGravityValue()
            {
               if(this._gravityValue)
                {
                    this._gravityValue--;
                    this.renderer.renderHTMLView(this.renderer.gravityValView, `Gravity: ${this._gravityValue}`);
                } 
            };

            /**
             * 
             * @param {{x: number, y: number}} position 
             */
            onGenRandomShapeByClick(position)
            {   
                let canvas = this.renderer.view;
                let shapeColor = Utils.genRandomColor();
                let x = position.x - canvas.offsetLeft;
                let y = position.y - canvas.offsetTop;
                let point = new Point(x, y);
                
                if(!this._changeGroupColor(point, shapeColor))
                    this.createShape(shapeColor, point);
            };

            /**
             * @param {Point} point
             * @param {number} color
             * @return {boolean}
             */
            _changeGroupColor(point, color)
            {
                for(let shape of this.visibles)
                {
                    if(shape.containsPoint(point))
                    {
                        let type = shape.type;
                        this.shapesStore.get(type).forEach(tShape => {
                            tShape.changeColor(color);
                        });
                        return true;
                    }
                }
                return false;
            };

            onGenRandomShapeByTime()
            {
                let shapePosition = null, shapeType = null, shapeColor = null, shape = null, bounds = null;
                let cw = this.renderer.view.width, ch = this.renderer.view.height;

                for(let i = 0; i < this._spsValue; i++)
                {
                    shapeColor = Utils.genRandomColor();
                    shape = this.createShape(shapeColor);
                    bounds = shape.getBounds();
                    shapePosition = Utils.genRandomPosition(bounds.width, bounds.height, cw, ch);
                    shape.position = shapePosition;
                }
            };

            updateShapes()
            {
                let lowerBound = this.renderer.view.height;
                
                if(this._gravityValue)
                    this.visibles.forEach(shape => {
                        let boundary = shape.getBounds();
                        if(boundary.top > lowerBound)
                        {
                            shape.visible = false;
                            this.visibles.delete(shape);
                            this.shapesStore.get(shape.type).delete(shape);
                            this.renderer.renderHTMLView(this.renderer.shapesNumView, `Shapes: ${--this._visibleShapesNum}`);
                            this.renderer.renderHTMLView(this.renderer.totalAreaView, `Area: ${this._totalShapesArea -= shape.area}`);
                            if(!this.shapeCache.isFull())
                            {
                                shape.rotation = 0;
                                shape.scale.set(1, 1);
                                shape.updateArea();
                                this.shapeCache.set(shape);
                            }
                            else
                                this.renderer.mainStage.removeChild(shape);
                        }
                        else
                            shape.position.y += this._gravityValue;
                    });      
            };
        };

        export default ShapesManager;