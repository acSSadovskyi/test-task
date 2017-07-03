

        
        class Controler
        {
            /**
             * 
             * @param {ShapesManager} shapeManager 
             * @param {number} [initSpsValue]
             */
            constructor(shapeManager, initSpsValue = 0)
            {
                this.shapeManager = shapeManager;
                if(initSpsValue)
                    this.shapeManager.onIncreseSpsValue(initSpsValue);
                
            }; 

            bindPrimaryEvents()
            {
                document.querySelector("#inc-shape").addEventListener('click', () => {
                    this.shapeManager.onIncreaseSpsValue();
                    // console.log("Shape per second +1");
                });

                document.querySelector("#dec-shape").addEventListener('click', () => {
                    this.shapeManager.onDecreaseSpsValue();
                    // console.log("Shape per second -1");
                });

                document.querySelector("#inc-gravity").addEventListener('click', () => {
                    this.shapeManager.onIncreaseGravityValue();
                    // console.log("Gravity +1");
                }); 

                document.querySelector("#dec-gravity").addEventListener('click', () => {
                    this.shapeManager.onDecreaseGravityValue();
                    // console.log("Gravity -1");
                });
                
                document.querySelector("#canvas").addEventListener('click', (e) => {
                    this.shapeManager.onGenRandomShapeByClick({x: e.clientX, y: e.clientY});
                });
                
                setInterval(() => {
                    this.shapeManager.onGenRandomShapeByTime();
                }, 1000);
            };   
        };

        export default Controler;

