const table = document.querySelector("#tab")
const table1 = document.querySelector("#tab1")
//("#one").children[0].children[0]
function sudoku(){
    var arr = [[],[],[],[],[],[],[],[],[]];
    for (let i = 0; i < 9; i++) {
        for (let d = 0; d < 9; d++) {
            arr[i].push(parseInt(table.rows[i].cells[d].children[0].value,10)) 
        }
    }
    Sudoku(arr,arr.length)
}

function Sudoku(arr, n) {
    let row = -1;
		let col = -1;
		let isEmpty = true;
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (arr[i][j] === 0) {
					row = i;
					col = j;
					isEmpty = false;
					break;
				}
			}
			if (!isEmpty)
				break;
		}
		if (isEmpty) {
			print(arr, n);
			return true;
		}
		for (let r = 1; r <= n; r++) {
			if (isSafe(arr, n, row, col, r)) {
				arr[row][col] = r;
				if (Sudoku(arr, n)) {
					return true;
				} else {
					arr[row][col] = 0;
				}
			}
		}
		return false;
}

function print(arr,n) {
    table.style.display = "none"
    table1.style.display = "block"
    table1.style.margin= "auto"
    for (let i = 0; i < 9; i++) {
        for (let d = 0; d < 9; d++) {
            table1.rows[i].cells[d].children[0].value = arr[i][d]
            table1.rows[i].cells[d].children[0].readOnly = true
        }
    }
}

function isSafe(arr, n, row, col, r) {
    // Checking for row
    for (let i = 0; i < n; i++) {
        if (arr[row][i] === r) {
            return false;
        }
    }
    // Checking for col
    for (let i = 0; i < n; i++) {
        if (arr[i][col] === r) {
            return false;
        }
    }
    let sizeOfGrid = 3;
    let gridStartRow = sizeOfGrid * Math.floor(row / sizeOfGrid);
    let gridStartCol = sizeOfGrid * Math.floor(col / sizeOfGrid);
    for (let i = gridStartRow; i < gridStartRow + sizeOfGrid; i++) {
        for (let d = gridStartCol; d < gridStartCol + sizeOfGrid; d++) {
            if (arr[i][d] === r) {
                return false;
            }
        }
    }
    return true;
}

function callMeToReset(){
    let n = 9;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            table.rows[i].cells[j].children[0].value = ""
        }
    }
}