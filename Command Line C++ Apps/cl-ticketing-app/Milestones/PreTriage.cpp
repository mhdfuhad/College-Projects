/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 08/04/2021
*/

/* Citation and Sources...
Final Project Milestone 5
Module: PreTriage
Filename: PreTriage.cpp
Version 1.0
Author	Mohammad Fuhad Uddin
Revision History
-----------------------------------------------------------
Date        Reason
????/??/??
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my workshops and assignments.
-----------------------------------------------------------*/

#define _CRT_SECURE_NO_WARNINGS
#include <cstring>
#include <iostream>
#include <fstream>
#include "PreTriage.h"
#include "utils.h"
#include "Patient.h"
#include "Time.h"
#include "CovidPatient.h"
#include "TriagePatient.h"

using namespace std;

namespace sdds {
	void PreTriage::reg()
	{
		if (m_lineupSize == maxNoOfPatients) {
			cout << "Line up full!" << endl;
		}
		else { 
			int selection = -1;
			m_pMenu >> selection; //menu is shown only once when function called
			if (selection == 1) {
				m_lineup[m_lineupSize] = new CovidPatient;
			}
			else if (selection == 2) {
				m_lineup[m_lineupSize] = new TriagePatient;
			}
			else if (selection == 0) return; //leave function with no value
			
			if (selection == 1 || selection == 2) {
				m_lineup[m_lineupSize]->setArrivalTime();
				cout << "Please enter patient information: " << endl;
				m_lineup[m_lineupSize]->fileIO(false);
				m_lineup[m_lineupSize]->read(cin);
				cout << "\n******************************************" << endl;
				m_lineup[m_lineupSize]->write(cout);
				cout << "Estimated Wait Time: " << getWaitTime(*m_lineup[m_lineupSize]) << endl;
				cout << "******************************************\n" << endl;
				m_lineupSize++;
			}
		}
	}

	void PreTriage::admit()
	{
		int selection = -1;
		char type = '\0';
		m_pMenu >> selection; //menu is shown only once when function called
		if (selection == 1) {
			type = 'C';
		}
		else if (selection == 2) {
			type = 'T';
		}
		else if (selection == 0) return; //leave function with no value

		if (selection == 1 || selection == 2) {
			int index = -1;
			index = indexOfFirstInLine(type);
			if (index > -1) {
				cout << "\n******************************************" << endl;
				m_lineup[index]->fileIO(false);
				cout << "Calling for ";
				cout << *m_lineup[index];
				cout << "******************************************\n" << endl;
				setAverageWaitTime(*m_lineup[index]);
				removePatientFromLineup(index);
			}
			else return; //when not valid index it will leave function
		}
	}

	const Time PreTriage::getWaitTime(const Patient& p) const
	{
		unsigned int count = 0;
		int i;
		for (i = 0; i < m_lineupSize; i++) {
			if (*m_lineup[i] == p) {
				count++;
			}
		}

		if (p == 'T') {
			return m_averTriageWait * count;
		}
		else if (p == 'C') {
			return m_averCovidWait * count;
		}
		else return 0;
	}

	void PreTriage::setAverageWaitTime(const Patient& p)
	{
		Time CT;
		CT.setToNow();

		Time A = CT - (Time)p; //Current time minus Patient ticket time
		unsigned int PTN = p.number(); //Patient Ticket Number

		if (p == 'T') {
			m_averTriageWait = (A + (m_averTriageWait * (PTN - 1))) / PTN;
		}
		else if (p == 'C') {
			 m_averCovidWait = (A + (m_averCovidWait * (PTN - 1))) / PTN;
		}
	}

	void PreTriage::removePatientFromLineup(int index)
	{
		removeDynamicElement<Patient>(m_lineup, index, m_lineupSize); //use templated function to remove the patient from the lineup
	}

	int PreTriage::indexOfFirstInLine(char type) const
	{
		for (int i = 0; i < m_lineupSize; i++) {
			if (*m_lineup[i] == type) {
				return i;
			}
		}
		return -1;
	}

	void PreTriage::load()
	{
		cout << "Loading data..." << endl;

		//read from file
		ifstream fin;
		fin.open(m_dataFilename);
		if (fin.is_open()) {
			fin >> m_averCovidWait;
			fin.ignore(); //ignores the comma
			fin >> m_averTriageWait;
			fin.ignore(); //ignores the nextline
			Patient* temp = nullptr;
			int i;
			for (i = 0; fin && i < maxNoOfPatients; i++) {
				char typeRead;
				fin.get(typeRead);
				fin.ignore(); //ignores the comma
				if (typeRead == 'T') {
					temp = new TriagePatient; //instantiate new triage patient
				}
				else if (typeRead == 'C') {
					temp = new CovidPatient; //instantiate new covid patient
				}

				if (temp) {
					temp->fileIO(true);
					temp->csvRead(fin);
					temp->fileIO(false);
					m_lineup[i] = temp;
					m_lineupSize++;
				}
			}
			if (fin && i > 0) { //if there is more to read from the file after max patients then it will show it exceeded max patients
				cout << "Warning: number of records exceeded " << maxNoOfPatients << endl;
				cout << i << " Records imported...\n" << endl;
			}

			if (!fin) {
				if (i == 0) {
					cout << "No data or bad data file!\n" << endl;
				}
				else {
					cout << i - 1 << " Records imported...\n" << endl;
					m_lineupSize--;
					delete temp;
				}
			}
			
		}
	}

	PreTriage::PreTriage(const char* dataFilename): m_averCovidWait(15), m_averTriageWait(5),m_appMenu("General Hospital Pre-Triage Application\n1- Register\n2- Admit",2),m_pMenu("Select Type of Admittance:\n1- Covid Test\n2- Triage",2)
	{
		m_dataFilename = new char[strlen(dataFilename) + 1]; 
		strcpy(m_dataFilename, dataFilename);
		load();
	}

	PreTriage::~PreTriage()
	{
		//write to file
		ofstream fout; 
		fout.open(m_dataFilename);
		if (fout.is_open()) {
			fout <<  m_averCovidWait << ',' << m_averTriageWait << endl;
			for (int i = 0; i < m_lineupSize; i++){
				m_lineup[i]->csvWrite(fout);
				fout << endl;
			}
		}
		fout.close();

		//write to console
		cout << "Saving Average Wait Times," << endl; 
		cout << "   COVID Test: " << m_averCovidWait << endl; 
		cout << "   Triage: " << m_averTriageWait << endl; 
		cout << "Saving m_lineup..." << endl;
		for (int i = 0; i < m_lineupSize; i++) { 
			cout << i + 1 << "- "; 
			m_lineup[i]->csvWrite(cout); 
			cout << endl;
		}
		cout << "done!" << endl;

		//deallocation
		for (int i = 0; i < m_lineupSize; i++) {
			delete m_lineup[i];
			m_lineup[i] = nullptr;
		}
		delete[] m_dataFilename; 
		m_dataFilename = nullptr; 

	}

	void PreTriage::run(void)
	{
		int quit = -1;
		while (quit != 0) {//menu stays until it asks to quit
			m_appMenu >> quit;
			if (quit == 1) {
				reg();
			}
			else if (quit == 2) {
				admit();
			}	
		}
	}
}