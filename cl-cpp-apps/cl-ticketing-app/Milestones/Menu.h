/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 22/03/2021
*/

/* Citation and Sources...
Final Project Milestone 2
Module: Menu
Filename: Menu.h
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

#ifndef SDDS_MENU_H
#define SDDS_MENU_H
#include <iostream>
namespace sdds {
	class Menu
	{
        char* m_text{ nullptr }; // holds the menu content dynamically
        int m_noOfSel{ 0 };  // holds the number of options displayed in menu content
        void display()const;
    public:
        Menu(const char* MenuContent, int NoOfSelections);
        virtual ~Menu();
        int& operator>>(int& Selection);
        // add safe copying logic
        Menu(const Menu& obj);
        Menu& operator=(const Menu& obj) = delete;
	};
}
#endif // !SDDS_MENU_H