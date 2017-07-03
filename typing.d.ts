

        
        declare enum SHAPES
        {
            TRIANGLE = 0,
            SQUARE = 1,
            PENTAGON = 2,
            HEXAGON = 3, 
            CIRCLE = 4,
            ELLIPSE = 5,
            RANDOM = 6
        }
        
        declare class Renderer
        {
            constructor (widht: number, height: number, transparensy: number): Renderer;
            view: HTMLCanvasElement;
            mainStage: PIXI.Container;
            shapesNumView: HTMLElement;
            totalAreaView: HTMLElement;
            shapesPerSecondView: HTMLElement;
            gravityValView: HTMLElement;

            renderHTMLView(element: HTMLElement, value: string);
            render();
        }

        declare class ShapesManager
        {
            new (renderer: Renderer, gravity: number);
            shapesStore: Map<SHAPES, Set<Shape>>;
            _gravityValue: number;
            _spsValue: number;
            _visibleShapesNum: number;

            createShape(shapeType: SHAPES, position: PIXI.Point | {x: number, y: number});
            _genRandomColor(): number;
            _genRandomShapeType(): SHAPES;
            _genRandomPosition(): PIXI.Point;
            _changeGroupColor(point: PIXI.Point, color: number);

            onIncreaseSpsValue(value?: number);
            onDecreaseSpsValue();
            onIncreaseGravityValue(value?: number);
            onDecreaseGravityValue();
            onGenRandomShapeByClick(position: {x: number, y: number});
            onGenRandomShapeByTime();

            updateShapes();
        }

        declare interface IShapesStore
        {
            new(): Map<SHAPES, Set<Shape>>;
        }

        declare class Shape
        {
            constructor(data: Polygon | Circle | Ellipse, color: number, position : Point | {x: number, y: number}, type: SHAPES);
            
            changeColor(color: number); 
        }