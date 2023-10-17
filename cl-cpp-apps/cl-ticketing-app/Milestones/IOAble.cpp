/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 22/03/2021
*/

/* Citation and Sources...
Final Project Milestone 2
Module: IOAble
Filename: IOAble.cpp
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

#include <iostream>
#include "IOAble.h"
namespace sdds {
    std::ostream& operator<<(std::ostream& ostr, const IOAble& obj)
    {
        return obj.write(ostr);
    }
    std::istream& operator>>(std::istream& istr,IOAble& obj)
    {
        return obj.read(istr);
    }
}
