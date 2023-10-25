#include "wall.h"
#include "maze.h"
/********************************************************************/
/*                                                                  */
/*  Author1 Name: Sami Ali                                          */
/*      - class/function list/main author or main checker           */
/*  Author2 Name: Mohammad Fuhad Uddin                              */
/*      - class/function list/main author or main checker           */
/*                                                                  */
/********************************************************************/


//Available Cell function
//Precondition: None
//Postconditions: Cell for next step
//Returns: True if one of the cells is available for the next step, false if not
//Parameters: The maze, starting and ending point for the cell
//Notes: This function will get a cell for the next step in a paths
bool availableCell(Maze &maze, int cellStart, int &cellNext)
{
    int delt[4] = {
       -1, 1, -maze.numCols(), maze.numCols()
    };

    for (int i = 0; i < 4; i++)
    { // this will find the cell that is available for the next step
        cellNext = delt[i] + cellStart;
        if (maze.canGo(cellStart, cellNext) && !maze.isMarked(cellNext))
        { // prevents memory leakage
            return true;
        }
    }
    return false;
}

//Run Maze function
//Precondition: Path index should not be 0
//Postconditions: Marksup a path in the maze
//Returns: Length of the path
//Parameters: The maze, a path, a starting and ending point for cell
//Notes: This function will find a path from fromCell to toCell
int runMaze(Maze &maze, int path[1], int cellStart, int endCell)
{
    int cellNext{};
    static int pIndex{};
    maze.mark(cellStart);
    path[pIndex] = cellStart; // this will push cellStart to the top of the stack and path represents the stack process

    if (cellStart == endCell)
    {
        int pLength = pIndex + 1;
        pIndex = 0;
        return pLength;
    }

    if (availableCell(maze, cellStart, cellNext))
    {
        pIndex++;
        return runMaze(maze, path, cellNext, endCell);
    }

    if (pIndex != 0)
    { // this will check whether the stack is empty or not
        pIndex--; // this will backtrack
        return runMaze(maze, path, path[pIndex], endCell);
    }

    return 0;
}
