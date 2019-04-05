/// <reference path="gpioinstance.ts" />

var Gpio = require('onoff').Gpio;

import { GPIOInstance } from "./gpioinstance";

    export enum Mode {
        INPUT = 'in',
        OUTPUT = 'out'
    }

    export enum PullMode {
        PUD_OFF,
        PUD_DOWN,
        PUD_UP
    }

    export enum InterruptEdge {
        RISING_EDGE = 'rising',
        FALLING_EDGE = 'falling',
        EITHER_EDGE = 'both',
        NONE = 'none'
    }


    export class GPIOAdaptor {

        instances : Array<GPIOInstance> = [];
        deletedinstance : Array<GPIOInstance> = [];


        constructor() {

        }

        createNewInstance(name : string, pin : number, mode : Mode, owner : string, timeout? : number, pullUpDown? : PullMode, interruptEdge? : InterruptEdge) {
            let libinstance;
            if (timeout) {
                if (timeout > 0) 
                    libinstance = new Gpio(pin, mode, InterruptEdge.NONE, {debounceTimeout: timeout});
                else    
                    throw "Debounce time cannot be zero or less";
            } else {
                libinstance = new Gpio(pin, mode);
            }
            let instance = new GPIOInstance(libinstance, owner, name, mode, interruptEdge);
            this.instances[name] = instance;
            return instance;
        } 

        deleteInstance(name : string, permanent : boolean = true) {
            let backup = this.instances[name];
            delete this.instances[name];
            if (!permanent) {
                this.deletedinstance[name] = backup;
            }
        }

        getInstance(name : string) : GPIOInstance {
            return this.instances[name];
        }

        //I2c   
        createNewProtocolInstance()
        
    }
