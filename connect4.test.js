describe('Board Related Tests', function(){


    beforeEach(function(){
        //initialization logic
    })
    it('should have the correct amount of rows in the board variable on makeBoard()', function(){
        expect(board.length).toEqual(HEIGHT)
    })
    it('should have the correct amount of columns in a row on makeBoard()', function(){
        expect(board[0].length).toEqual(WIDTH)
        expect(board[1].length).toEqual(WIDTH)
        expect(board[2].length).toEqual(WIDTH)
        expect(board[3].length).toEqual(WIDTH)
        expect(board[4].length).toEqual(WIDTH)
        expect(board[5].length).toEqual(WIDTH)
        
    })
    it('should should start with all undefined values in the board array on makeBoard()',function(){
        expect(board.every(row=>row.every(cell=> cell===undefined))).toBeTrue()
    })
    it('should have the correct amount of TD elements with ID column-top on makeHTMLBoard()',function(){
        const columnTopTds = document.querySelectorAll('#column-top td')
        expect(columnTopTds.length).toEqual(WIDTH)

    })
    it('should have the correct amount of TD elements on the whole board on makeHTMLBoard()', function(){
        const allTds = document.querySelectorAll('td')
        expect(allTds.length).toEqual(WIDTH * (HEIGHT + 1))
    })
    it('should have the correct amount of TR elements given HEIGHT +1 (for column-top) on makeHTMLBoard()',function(){
        const allTrs = document.querySelectorAll('tr')
        expect(allTrs.length).toEqual(HEIGHT+1)
    })
    
    afterEach(function(){
        //teardown logic
    })
})
// describe('check for win logic', function(){


//     beforeEach(function(){
//         //initialization logic
//     })
//     it('', function(){
        
//     })
//     afterEach(function(){
//         //teardown logic
//     })
// })