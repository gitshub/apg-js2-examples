module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 5
    //       udts = 0
    //    opcodes = 20
    //        ALT = 0
    //        CAT = 4
    //        RNM = 6
    //        UDT = 0
    //        REP = 3
    //        AND = 1
    //        NOT = 0
    //        TLS = 6
    //        TBS = 0
    //        TRG = 0
    // characters = [97 - 99]

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['anbn'] = false;
    this.callbacks['anbncn'] = false;
    this.callbacks['bncn'] = false;
    this.callbacks['consumeas'] = false;
    this.callbacks['prefix'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'AnBnCn', lower: 'anbncn', index: 0};
    this.rules[1] = {name: 'Prefix', lower: 'prefix', index: 1};
    this.rules[2] = {name: 'ConsumeAs', lower: 'consumeas', index: 2};
    this.rules[3] = {name: 'AnBn', lower: 'anbn', index: 3};
    this.rules[4] = {name: 'BnCn', lower: 'bncn', index: 4};

    // UDTS
    this.udts = [];

    // OPCODES
    // AnBnCn
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,3,4]};// CAT
    this.rules[0].opcodes[1] = {type: 6};// AND
    this.rules[0].opcodes[2] = {type: 4, index: 1};// RNM(Prefix)
    this.rules[0].opcodes[3] = {type: 4, index: 2};// RNM(ConsumeAs)
    this.rules[0].opcodes[4] = {type: 4, index: 4};// RNM(BnCn)

    // Prefix
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[1].opcodes[1] = {type: 4, index: 3};// RNM(AnBn)
    this.rules[1].opcodes[2] = {type: 9, string: [99]};// TLS

    // ConsumeAs
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[2].opcodes[1] = {type: 9, string: [97]};// TLS

    // AnBn
    this.rules[3].opcodes = [];
    this.rules[3].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[3].opcodes[1] = {type: 9, string: [97]};// TLS
    this.rules[3].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[3].opcodes[3] = {type: 4, index: 3};// RNM(AnBn)
    this.rules[3].opcodes[4] = {type: 9, string: [98]};// TLS

    // BnCn
    this.rules[4].opcodes = [];
    this.rules[4].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[4].opcodes[1] = {type: 9, string: [98]};// TLS
    this.rules[4].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[4].opcodes[3] = {type: 4, index: 4};// RNM(BnCn)
    this.rules[4].opcodes[4] = {type: 9, string: [99]};// TLS
}

// INPUT GRAMMAR FILE(s)
//
// ;
// ; text book example of a phrase which
// ; cannot be described with a context-free grammar
// ; but can be described using syntactic predicates
// ;
// AnBnCn    = &Prefix ConsumeAs BnCn
// Prefix    = AnBn "c"
// ConsumeAs = *"a"
// AnBn      = "a" [AnBn] "b"
// BnCn      = "b" [BnCn] "c"
