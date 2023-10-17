/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 22/03/2021
*/

/* Citation and Sources...
Final Project Milestone 2
Module: Menu
Filename: Menu.cpp
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
#include <iostream>
#include <cstring>
#include "Menu.h"
#include "utils.h"
using namespace std;
namespace sdds {

	void Menu::display() const
	{
		cout << m_text << '\n' << "0- Exit" << endl;
	}

	Menu::Menu(const char* MenuContent, int NoOfSelections)
	{
		delete[] m_text;
		if (MenuContent) {
			m_text = new char[strlen(MenuContent) + 1];
			strcpy(m_text, MenuContent);
			m_noOfSel = NoOfSelections;
		}
	}

	Menu::~Menu()
	{
		delete[] m_text;
		m_text = nullptr;
	}

	int& Menu::operator>>(int& Selection)
	{
		display();
		return Selection = getInt(0, m_noOfSel, "> ", "Invalid option "); 
	}

	Menu::Menu(const Menu& obj)
	{
		if (obj.m_text != nullptr) {
			delete[] this->m_text;
			this->m_text = nullptr;
			this->m_text = new char[strlen(obj.m_text) + 1]; //dynamically allocate memory size of incoming obj to current obj
			strcpy(this->m_text, obj.m_text);
			this->m_noOfSel = obj.m_noOfSel;
		}
	}

}