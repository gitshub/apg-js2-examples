module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 2
    //       udts = 1
    //    opcodes = 4
    //        ALT = 0
    //        CAT = 1
    //        RNM = 0
    //        UDT = 1
    //        REP = 0
    //        AND = 0
    //        NOT = 0
    //        TLS = 2
    //        TBS = 0
    //        TRG = 0
    // characters = [32 - 116] + user defined

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['more'] = false;
    this.callbacks['start'] = false;
    this.callbacks['u_more'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'start', lower: 'start', index: 0};
    this.rules[1] = {name: 'more', lower: 'more', index: 1};

    // UDTS
    this.udts = [];
    this.udts[0] = {name: 'u_more', lower: 'u_more', empty: false, index: 0};

    // OPCODES
    // start
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[0].opcodes[1] = {type: 9, string: [115,116,97,114,116]};// TLS
    this.rules[0].opcodes[2] = {type: 5, empty: false, index: 0};// UDT(u_more)

    // more
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 9, string: [32,109,111,114,101]};// TLS
}

// INPUT GRAMMAR FILE(s)
//
// start = "start" u_more
// more = " more"