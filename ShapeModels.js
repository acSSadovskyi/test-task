


        import {Polygon, Circle, Ellipse} from 'pixi.js';
        import SHAPES from './ShapeTypes';

        const TRIANGLE_MODEL = new Polygon([0, -25, -25, 25, 25, 25]);
        const SQUARE_MODEL = new Polygon([-25, 25, -25, -25, 25, -25, 25, 25]);
        const PENTAGON_MODEL = new Polygon([0, -25, -25, -5, -15, 25, 15, 25, 25, -5]);
        const HEXAGON_MODEL = new Polygon([0, -25, -15, -25, -25, 0, -15, 25, 0, 25, 15, 25, 25, 0, 15, -25]);
        const CIRCLE_MODEL = new Circle(0, 0, 25);
        const ELLIPSE_MODEL = new Ellipse(0, 0, 50, 25);
        const RANDOM_MODEL = {sectorNum: 10, sectorWidth: 25};

        const Models = new Map([
                [SHAPES.TRIANGLE, TRIANGLE_MODEL],
                [SHAPES.SQUARE, SQUARE_MODEL],
                [SHAPES.PENTAGON, PENTAGON_MODEL],
                [SHAPES.HEXAGON, HEXAGON_MODEL],
                [SHAPES.CIRCLE, CIRCLE_MODEL],
                [SHAPES.ELLIPSE, ELLIPSE_MODEL],
                [SHAPES.RANDOM, RANDOM_MODEL]
        ]);

        export default Models;