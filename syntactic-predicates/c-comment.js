module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 5
    //       udts = 0
    //    opcodes = 15
    //        ALT = 1
    //        CAT = 2
    //        RNM = 4
    //        UDT = 0
    //        REP = 1
    //        AND = 0
    //        NOT = 1
    //        TLS = 3
    //        TBS = 1
    //        TRG = 2
    // characters = [9 - 126]

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['any'] = false;
    this.callbacks['begin'] = false;
    this.callbacks['comment'] = false;
    this.callbacks['end'] = false;
    this.callbacks['stop'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'comment', lower: 'comment', index: 0};
    this.rules[1] = {name: 'begin', lower: 'begin', index: 1};
    this.rules[2] = {name: 'stop', lower: 'stop', index: 2};
    this.rules[3] = {name: 'end', lower: 'end', index: 3};
    this.rules[4] = {name: 'any', lower: 'any', index: 4};

    // UDTS
    this.udts = [];

    // OPCODES
    // comment
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
    this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(begin)
    this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[0].opcodes[3] = {type: 2, children: [4,6]};// CAT
    this.rules[0].opcodes[4] = {type: 7};// NOT
    this.rules[0].opcodes[5] = {type: 4, index: 2};// RNM(stop)
    this.rules[0].opcodes[6] = {type: 4, index: 4};// RNM(any)
    this.rules[0].opcodes[7] = {type: 4, index: 3};// RNM(end)

    // begin
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 9, string: [47,42]};// TLS

    // stop
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 9, string: [42,47]};// TLS

    // end
    this.rules[3].opcodes = [];
    this.rules[3].opcodes[0] = {type: 9, string: [42,47]};// TLS

    // any
    this.rules[4].opcodes = [];
    this.rules[4].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[4].opcodes[1] = {type: 8, min: 32, max: 126};// TRG
    this.rules[4].opcodes[2] = {type: 8, min: 9, max: 10};// TRG
    this.rules[4].opcodes[3] = {type: 10, string: [13]};// TBS
}

// INPUT GRAMMAR FILE(s)
//
// ;
// ; C-style comment
// ;
// comment = begin *(!stop any) end
// begin = "/*"
// stop = "*/"
// end = "*/"
// any = %d32-126 / %d9-10 / %d13
