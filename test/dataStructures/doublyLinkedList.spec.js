var expect = require('chai').expect,
    di = require('../../di');
        
describe('doublyLinkedList test', function() {

    'use strict';

    var doublyLinkedList = di.getDoublyLinkedListFactory()();

    it('should have initial count of 0', function(){
        expect(doublyLinkedList.count()).to.be.equal(0);
    });

    it('should add 2 nodes at first n1 and n2', function(){
        doublyLinkedList.addFirst('n2');
        doublyLinkedList.addFirst('n1');
        expect(doublyLinkedList.count()).to.be.equal(2);
    });

    it('should add a first node using addLast as well', function(){
        doublyLinkedList.clear();
        doublyLinkedList.addLast('n2');
        doublyLinkedList.addFirst('n1');
        expect(doublyLinkedList.count()).to.be.equal(2);
    });

    it('should find the first node n1', function(){
        var n1 = doublyLinkedList.find('n1');
        expect(n1).not.to.be.equal(null);
        expect(n1.getPrev()).to.be.equal(null);
        expect(n1.getValue()).to.be.equal('n1');
        expect(n1.getNext().getValue()).to.be.equal('n2');
    });

    it('should add 2 nodes at last n5 and n6', function(){
        doublyLinkedList.addLast('n5');
        doublyLinkedList.addLast('n6');
        expect(doublyLinkedList.count()).to.be.equal(4);
    });

    it('should find node n6', function(){
        var n6 = doublyLinkedList.find('n6');
        expect(n6).not.to.be.equal(null);
        expect(n6.getNext()).to.be.equal(null);
        expect(n6.getPrev().getValue()).to.be.equal('n5');
        expect(n6.getValue()).to.be.equal('n6');
    });

    it('should find a node before another node', function(){
        var beforeNode1 = doublyLinkedList.findBefore('n1');
        var beforeNode2 = doublyLinkedList.findBefore('n5');
        expect(beforeNode1).to.be.equal(null);
        expect(beforeNode2.getValue()).to.be.equal('n2');
    });

    it('should add a new node n3 after node n2', function(){
        doublyLinkedList.addAfter('n2', 'n3');
        expect(doublyLinkedList.count()).to.be.equal(5);
    });

    it('should throw an exception when trying to add after a non existing node', function(){
        expect(doublyLinkedList.addAfter.bind(doublyLinkedList, 'n10', 'n11')).to.throw({
            message: 'node n10 not found'
        });
    });

    it('should find the node n3', function(){
        var n3 = doublyLinkedList.find('n3');
        expect(n3).not.to.be.equal(null);
        expect(n3.getValue()).to.be.equal('n3');
        expect(n3.getPrev().getValue()).to.be.equal('n2');
        expect(n3.getNext().getValue()).to.be.equal('n5');
    });

    it('should add a new node n4 before node n5', function(){
        doublyLinkedList.addBefore('n5', 'n4');
        expect(doublyLinkedList.count()).to.be.equal(6);
    });

    it('should throw an exception when trying to add before a non existing node', function(){
        expect(doublyLinkedList.addBefore.bind(doublyLinkedList, 'n10', 'n9')).to.throw({
            message: 'node n10 not found'
        });
    });

    it('should find the node n4', function(){
        var n4 = doublyLinkedList.find('n4');
        expect(n4).not.to.be.equal(null);
        expect(n4.getValue()).to.be.equal('n4');
        expect(n4.getPrev().getValue()).to.be.equal('n3');
        expect(n4.getNext().getValue()).to.be.equal('n5');
    });

    it('should remove last node', function(){
        doublyLinkedList.removeLast();
        var last = doublyLinkedList.findLast();
        expect(doublyLinkedList.count()).to.be.equal(5);
        expect(last.getNext()).to.be.equal(null);
        expect(last.getPrev().getValue()).to.be.equal('n4');
    });

    it('should remove first node n1', function(){
        doublyLinkedList.removeFirst();
        var first = doublyLinkedList.findFirst();
        expect(doublyLinkedList.count()).to.be.equal(4);
        expect(first.getValue()).to.be.equal('n2');
    });

    it('should remove first node for a list with one node', function(){
        var oneNodeList = di.getDoublyLinkedListFactory()();
        oneNodeList.addFirst('n1');
        expect(oneNodeList.count()).to.be.equal(1);
        oneNodeList.removeFirst();
        expect(oneNodeList.count()).to.be.equal(0);
    });

    it('should remove last node for a list with one node', function(){
        var oneNodeList = di.getDoublyLinkedListFactory()();
        oneNodeList.addFirst('n1');
        expect(oneNodeList.count()).to.be.equal(1);
        oneNodeList.removeLast();
        expect(oneNodeList.count()).to.be.equal(0);
    });

    it('should remove the node n4', function(){
        doublyLinkedList.remove('n4');
        var n4 = doublyLinkedList.find('n4');
        var n3 = doublyLinkedList.find('n3');
        expect(doublyLinkedList.count()).to.be.equal(3);
        expect(n4).to.be.equal(null);
        expect(n3.getNext().getValue()).to.be.equal('n5');

        doublyLinkedList.remove('n2');
        var n2 = doublyLinkedList.find('n2');
        expect(doublyLinkedList.count()).to.be.equal(2);
        expect(n2).to.be.equal(null);
    });

    it('should throw an exception when trying to remove a non existing node', function(){
        expect(doublyLinkedList.remove.bind(doublyLinkedList, 'n12')).to.throw({
            message: 'node n10 not found'
        });
    });

    it('should clear the linked list', function(){
        doublyLinkedList.clear();
        expect(doublyLinkedList.count()).to.be.equal(0);
    });

});