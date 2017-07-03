


        class Cache
        {
            /** @param {number} maxLength */
            constructor(maxLength)
            {
                this.MAX_LENGTH = maxLength;

                /**
                 * @template T
                 * @type {Array<T>}
                */
                this._data = Array();
            };

            get()
            {
                let index = Math.floor(Math.random() * this._data.length);
                return this._data.splice(index, 1)[0];
            };

            /**
             * @template T
             * @param {T} data 
             */
            set(data)
            {
                if(this._data.length < this.MAX_LENGTH)
                {
                    this._data.push(data);
                    return true;
                }
                else
                    return false;
            };

            isEmpty()
            {
                return this._data.length === 0 ? true : false;
            }

            isFull()
            {
                return this._data.length === this.MAX_LENGTH ? true : false;
            };
        }

        export default Cache;