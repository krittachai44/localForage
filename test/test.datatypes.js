/* global before:true, beforeEach:true, describe:true, expect:true, it:true, Modernizr:true */
var DRIVERS = [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
    localforage.WEBSQL
];

DRIVERS.forEach(function(driverName) {
    if ((!Modernizr.indexeddb && driverName === localforage.INDEXEDDB) ||
        (!Modernizr.localstorage && driverName === localforage.LOCALSTORAGE) ||
        (!Modernizr.websqldatabase && driverName === localforage.WEBSQL)) {
        // Browser doesn't support this storage library, so we exit the API
        // tests.
        return;
    }

    describe('Type handler for ' + driverName, function() {
        'use strict';

        before(function(done) {
            localforage.setDriver(driverName).then(done);
        });

        beforeEach(function(done) {
            localforage.clear(done);
        });

        it('saves a string [callback]', function(done) {
            localforage.setItem('office', 'Initech', function(err, setValue) {
                expect(setValue).to.be('Initech');

                localforage.getItem('office', function(err, value) {
                    expect(value).to.be(setValue);
                    done();
                });
            });
        });
        it('saves a string [promise]', function(done) {
            localforage.setItem('office', 'Initech').then(function(setValue) {
                expect(setValue).to.be('Initech');

                return localforage.getItem('office');
            }).then(function(value) {
                expect(value).to.be('Initech');
                done();
            });
        });

        it('saves a number [callback]', function(done) {
            localforage.setItem('number', 546, function(err, setValue) {
                expect(setValue).to.be(546);
                expect(setValue).to.be.a('number');

                localforage.getItem('number', function(err, value) {
                    expect(value).to.be(setValue);
                    expect(value).to.be.a('number');
                    done();
                });
            });
        });
        it('saves a number [promise]', function(done) {
            localforage.setItem('number', 546).then(function(setValue) {
                expect(setValue).to.be(546);
                expect(setValue).to.be.a('number');

                return localforage.getItem('number');
            }).then(function(value) {
                expect(value).to.be(546);
                expect(value).to.be.a('number');
                done();
            });
        });

        it('saves a boolean [callback]', function(done) {
            localforage.setItem('boolean', false, function(err, setValue) {
                expect(setValue).to.be(false);
                expect(setValue).to.be.a('boolean');

                localforage.getItem('boolean', function(err, value) {
                    expect(value).to.be(setValue);
                    expect(value).to.be.a('boolean');
                    done();
                });
            });
        });
        it('saves a boolean [promise]', function(done) {
            localforage.setItem('boolean', false).then(function(setValue) {
                expect(setValue).to.be(false);
                expect(setValue).to.be.a('boolean');

                return localforage.getItem('boolean');
            }).then(function(value) {
                expect(value).to.be(false);
                expect(value).to.be.a('boolean');
                done();
            });
        });

        it('saves null [callback]', function(done) {
            localforage.setItem('null', null, function(err, setValue) {
                expect(setValue).to.be(null);

                localforage.getItem('null', function(err, value) {
                    expect(value).to.be(null);
                    done();
                });
            });
        });
        it('saves null [promise]', function(done) {
            localforage.setItem('null', null).then(function(setValue) {
                expect(setValue).to.be(null);

                return localforage.getItem('null');
            }).then(function(value) {
                expect(value).to.be(null);
                done();
            });
        });

        it('saves undefined as null [callback]', function(done) {
            localforage.setItem('null', undefined, function(err, setValue) {
                expect(setValue).to.be(null);

                localforage.getItem('null', function(err, value) {
                    expect(value).to.be(null);
                    done();
                });
            });
        });
        it('saves undefined as null [promise]', function(done) {
            localforage.setItem('null', undefined).then(function(setValue) {
                expect(setValue).to.be(null);

                return localforage.getItem('null');
            }).then(function(value) {
                expect(value).to.be(null);
                done();
            });
        });

        it('saves a float [callback]', function(done) {
            localforage.setItem('float', 546.041, function(err, setValue) {
                expect(setValue).to.be(546.041);
                expect(setValue).to.be.a('number');

                localforage.getItem('float', function(err, value) {
                    expect(value).to.be(setValue);
                    expect(value).to.be.a('number');
                    done();
                });
            });
        });
        it('saves a float [promise]', function(done) {
            localforage.setItem('float', 546.041).then(function(setValue) {
                expect(setValue).to.be(546.041);
                expect(setValue).to.be.a('number');

                return localforage.getItem('float');
            }).then(function(value) {
                expect(value).to.be(546.041);
                expect(value).to.be.a('number');
                done();
            });
        });

        var arrayToSave = [2, 'one', true];
        it('saves an array [callback]', function(done) {
            localforage.setItem('array', arrayToSave, function(err, setValue) {
                expect(setValue.length).to.be(arrayToSave.length);
                expect(setValue instanceof Array).to.be(true);

                localforage.getItem('array', function(err, value) {
                    expect(value.length).to.be(arrayToSave.length);
                    expect(value instanceof Array).to.be(true);
                    expect(value[1]).to.be.a('string');
                    done();
                });
            });
        });
        it('saves an array [promise]', function(done) {
            localforage.setItem('array', arrayToSave).then(function(setValue) {
                expect(setValue.length).to.be(arrayToSave.length);
                expect(setValue instanceof Array).to.be(true);

                return localforage.getItem('array');
            }).then(function(value) {
                expect(value.length).to.be(arrayToSave.length);
                expect(value instanceof Array).to.be(true);
                expect(value[1]).to.be.a('string');
                done();
            });
        });

        var objectToSave = {
            floating: 43.01,
            nested: {
                array: [1, 2, 3]
            },
            nestedObjects: [
                {truth: true},
                {theCake: 'is a lie'},
                {happiness: 'is a warm gun'},
                false
            ],
            string: 'bar'
        };
        it('saves a nested object [callback]', function(done) {
            localforage.setItem('obj', objectToSave, function(err, setValue) {
                expect(Object.keys(setValue).length)
                    .to.be(Object.keys(objectToSave).length);
                expect(setValue).to.be.an('object');

                localforage.getItem('obj', function(err, value) {
                    expect(Object.keys(value).length)
                        .to.be(Object.keys(objectToSave).length);
                    expect(value).to.be.an('object');
                    expect(value.nested).to.be.an('object');
                    expect(value.nestedObjects[0].truth).to.be.a('boolean');
                    expect(value.nestedObjects[1].theCake).to.be.a('string');
                    expect(value.nestedObjects[3]).to.be(false);
                    done();
                });
            });
        });
        it('saves a nested object [promise]', function(done) {
            localforage.setItem('obj', objectToSave).then(function(setValue) {
                expect(Object.keys(setValue).length)
                    .to.be(Object.keys(objectToSave).length);
                expect(setValue).to.be.an('object');

                return localforage.getItem('obj');
            }).then(function(value) {
                expect(Object.keys(value).length)
                    .to.be(Object.keys(objectToSave).length);
                expect(value).to.be.an('object');
                expect(value.nested).to.be.an('object');
                expect(value.nestedObjects[0].truth).to.be.a('boolean');
                expect(value.nestedObjects[1].theCake).to.be.a('string');
                expect(value.nestedObjects[3]).to.be(false);
                done();
            });
        });

        // Skip binary data tests if Array Buffer isn't supported.
        if (typeof ArrayBuffer !== 'undefined') {
            var runBinaryTest = function(url, done) {
                var request = new XMLHttpRequest();

                request.open('GET', url, true);
                request.responseType = 'arraybuffer';

                // When the AJAX state changes, save the photo locally.
                request.onreadystatechange = function() {
                    if (request.readyState === request.DONE) {
                        var response = request.response;
                        localforage.setItem('ab', response, function(err, sab) {
                            expect(sab.toString())
                                .to.be('[object ArrayBuffer]');
                            expect(sab.byteLength)
                                .to.be(response.byteLength);
                        }).then(function() {
                            // TODO: Running getItem from inside the setItem
                            // callback times out on IE 10/11. Could be an
                            // open transaction issue?
                            localforage.getItem('ab', function(err, arrayBuff) {
                                expect(arrayBuff.toString())
                                    .to.be('[object ArrayBuffer]');
                                expect(arrayBuff.byteLength)
                                    .to.be(response.byteLength);
                            });
                            done();
                        });
                    }
                };

                request.send();                
            };

            it('saves binary data', function(done) {
                runBinaryTest('/test/photo.jpg', done);
            });

            it('saves odd length binary data', function(done) {
                runBinaryTest('/test/photo2.jpg', done);
            });
        } else {
            it.skip('saves binary data (ArrayBuffer type does not exist)');
        }
    });

    describe('Typed Array handling in ' + driverName, function() {
        if (typeof Int8Array !== 'undefined') {
            it('saves an Int8Array', function(done) {
                var array = new Int8Array(8);
                array[2] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Int8Array).to.be(true);
                        expect(readValue[2]).to.be(array[2]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Int8Array type");
        }

        if (typeof Uint8Array !== 'undefined') {
            it('saves an Uint8Array', function(done) {
                var array = new Uint8Array(8);
                array[0] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Uint8Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Uint8Array type");
        }

        if (typeof Uint8ClampedArray !== 'undefined') {
            it('saves an Uint8ClampedArray', function(done) {
                var array = new Uint8ClampedArray(8);
                array[0] = 0;
                array[1] = 93;
                array[2] = 350;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Uint8ClampedArray)
                            .to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[1]).to.be(array[1]);
                        expect(readValue[2]).to.be(array[2]);
                        expect(readValue[1]).to.be(writeValue[1]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Uint8Array type");
        }

        if (typeof Int16Array !== 'undefined') {
            it('saves an Int16Array', function(done) {
                var array = new Int16Array(8);
                array[0] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Int16Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Int16Array type");
        }

        if (typeof Uint16Array !== 'undefined') {
            it('saves an Uint16Array', function(done) {
                var array = new Uint16Array(8);
                array[0] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Uint16Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Uint16Array type");
        }

        if (typeof Int32Array !== 'undefined') {
            it('saves an Int32Array', function(done) {
                var array = new Int32Array(8);
                array[0] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Int32Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Int32Array type");
        }

        if (typeof Uint32Array !== 'undefined') {
            it('saves an Uint32Array', function(done) {
                var array = new Uint32Array(8);
                array[0] = 65;
                array[4] = 0;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Uint32Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Uint32Array type");
        }

        if (typeof Float32Array !== 'undefined') {
            it('saves a Float32Array', function(done) {
                var array = new Float32Array(8);
                array[0] = 6.5;
                array[4] = 0.1;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Float32Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Float32Array type");
        }

        if (typeof Float64Array !== 'undefined') {
            it('saves a Float64Array', function(done) {
                var array = new Float64Array(8);
                array[0] = 6.5;
                array[4] = 0.1;

                localforage.setItem('array', array, function(err, writeValue) {
                    localforage.getItem('array', function(err, readValue) {
                        expect(readValue instanceof Float64Array).to.be(true);
                        expect(readValue[0]).to.be(array[0]);
                        expect(readValue[4]).to.be(writeValue[4]);
                        expect(readValue.length).to.be(writeValue.length);

                        done();
                    });
                });
            });
        } else {
            it.skip("doesn't have the Float64Array type");
        }
    });
});
