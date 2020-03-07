// создаем поле игры
let divContainer = document.querySelector(".container");
for (let i = 0; i < 50; i++) {
    divContainer.appendChild(document.createElement("div"));
    for (let j = 0; j < 50; j++) {
        let field = document.createElement("div");
        field.className = "fieldStyle";
        divContainer.childNodes[i].appendChild(field);
    }
}
// функция случайного числа
function fortuitousNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// вывод жизни на поле
let matrixFieldOne = document.querySelectorAll(".container > div");

for (let i = 0; i < 1000; i++) {
    matrixFieldOne[fortuitousNumber(49, 0)].childNodes[fortuitousNumber(49, 0)].classList.add("thick");
}

// функция объединяющее поле со всех сторон
function changeNumber(arr) {
    let i = arr[0];
    let j = arr[1];

    if (i < 0 && j < 0) {
        i = 49;
        j = 49;
    }

    if (i > 49 && j > 49) {
        i = 0;
        j = 0;
    }

    if (i > 49 && j < 0) {
        i = 0;
        j = 49;
    }

    if (i < 0 && j > 49) {
        i = 49;
        j = 0;
    }

    if (i < 0 && j >= 0 && j <= 49) {
        i = 49;
        j = j;
    }

    if (i > 49 && j >= 0 && j <= 49) {
        i = 0;
        j = j;
    }

    if (j < 0 && i >= 0 && i <= 49) {
        i = i;
        j = 49;
    }

    if (j > 49 && i >= 0 && i <= 49) {
        i = i;
        j = 0;
    }
    arr[0] = i;
    arr[1] = j;
    return arr;

}
// создаем матрицы
function matrixField() {
    let arr = [];
    for (let i = 0; i < 50; i++) {
        arr.push([]);
        for (let j = 0; j < 50; j++) {
            arr[i].push(0);
        }
    }
    return arr;
}


let matrixField1 = matrixField();
for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
        if (matrixFieldOne[i].childNodes[j].classList.contains("thick")) {
            matrixField1[i][j] = 1;
        }
    }
}

let matrixField2 = matrixField();

// длина соседей
function lengthNeighbour(arr, i, j) {
        let arrIJ = [[changeNumber([i - 1, j - 1]), changeNumber([i - 1, j]), changeNumber([i - 1, j + 1])],
        [changeNumber([i, j - 1]), changeNumber([i, j]), changeNumber([i, j + 1])],
        [changeNumber([i + 1, j - 1]), changeNumber([i + 1, j]), changeNumber([i + 1, j + 1])]];

        let arrNeighbour = [arr[arrIJ[0][0][0]][arrIJ[0][0][1]],
        arr[arrIJ[0][1][0]][arrIJ[0][1][1]],
        arr[arrIJ[0][2][0]][arrIJ[0][2][1]],
        arr[arrIJ[1][0][0]][arrIJ[1][0][1]],
        arr[arrIJ[1][2][0]][arrIJ[1][2][1]],
        arr[arrIJ[2][0][0]][arrIJ[2][0][1]],
        arr[arrIJ[2][1][0]][arrIJ[2][1][1]],
        arr[arrIJ[2][2][0]][arrIJ[2][2][1]]];

        let trueNeighbourLength = arrNeighbour.filter(function (arrOne) {
            return arrOne === 1;
        }).length;

        return trueNeighbourLength;
}

// игра
function gameLive() {
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            if (matrixField1[i][j]) {
                if (lengthNeighbour(matrixField1, i, j) < 2 || lengthNeighbour(matrixField1, i, j) > 3) {
                    matrixField2[i][j] = 0;
                }
            } else {
                if (lengthNeighbour(matrixField1, i, j) === 3) {
                    matrixField2[i][j] = 1;
                }
            }
        }
    }

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            if (matrixField2[i][j]) {
                matrixFieldOne[i].childNodes[j].classList.add("thick");
            } else {
                matrixFieldOne[i].childNodes[j].classList.remove("thick");
            }
            matrixField1[i][j] = matrixField2[i][j];
        }
    }
}

setInterval(gameLive, 500);
