/**************************************************************************/
/*                                                                        */
/*   Experiment 1                                                         */
/*                                                                        */
/*   To compile: g++ experiment1.cpp timer.cpp -std=c++0x                 */
/*   Alter this main to help answer your first experiment question        */
/*                                                                        */
/**************************************************************************/

#include "table.h"
#include "timer.h"
#include <string>
#include <iostream>
#include <cstdlib>

const int maxRecords = 2000000;

void createData(std::string keys[], int data[], int max);
int main(int argc, char *argv[])
{

	std::string *keys = new std::string[maxRecords]; // list of test cases.
	int *data = new int[maxRecords];
	createData(keys, data, maxRecords);

	int numrecords[] = {200000, 350000, 500000, 750000, 900000};
	size_t cap = 1000000;

	for (int i = 0; i < 5; i++)
	{
		std::cout << "Load factor: " << (double)numrecords[i] / cap << std::endl;
		std::cout << "Number of Records: " << numrecords[i] << std::endl;
		std::cout << "Capacity: " << cap << std::endl;
		std::cout << '\n';

		LPTable<int> table1(cap);
		Timer T;
		for (int j = 0; j < numrecords[i]; j++)
		{
			// Add the records to the table
			table1.update(keys[j], data[j]);

			T.start(); // Start the time for the find function

			// Test find function
			table1.find(keys[j], data[j]);

			T.stop(); // Stop the time foe the find function
		}
		std::cout << "LP Table Time: " << T.currtime() << std::endl;

		ChainingTable<int> table2(cap);
		Timer T2;
		for (int k = 0; k < numrecords[i]; k++)
		{
			// Add the records to the table
			table2.update(keys[k], data[k]);

			T2.start(); // Start the timer for the find function

			// Test find function
			table2.find(keys[k], data[k]);

			T2.stop(); // Stop the timer for the find function
		}
		std::cout << "Chaining Table Time: " << T2.currtime() << std::endl;
		std::cout << '\n';
	}
}

void createData(std::string keys[], int data[], int max)
{
	FILE *fp = fopen("dictionary.txt", "r");
	int i = 0;
	std::string front = "A_";
	char curr[50];
	while (fscanf(fp, "%s\n", curr) == 1)
	{
		keys[i] = curr;
		data[i] = rand() % 100;
		i++;
	}
	int numWords = i;
	int j = 0;
	while (i < max)
	{
		keys[i] = front + keys[j];
		data[i] = rand() % 100;
		i++;
		j++;
		if (j == numWords)
		{
			front[0] += 1;
			j = 0;
		}
	}
}
