/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 24/03/2021
*/

/* Citation and Sources...
Final Project Milestone 3
Module: Patient
Filename: Patient.cpp
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
#include <string>
#include <cstring>
#include "Patient.h"
#include "utils.h"

using namespace std;
namespace sdds {
    Patient::Patient(int tnumber, bool flag):m_ticket(tnumber),m_IOflag(flag)
    {}
    Patient::~Patient()
    {
        delete[] m_name;
        m_name = nullptr;
    }
    const bool Patient::fileIO() const
    {
        return m_IOflag;
    }

    void Patient::fileIO(bool valid)
    {
        if (valid == true || valid == false) {//if valid parameter has value of false or true only then 
            m_IOflag = valid;   //store input
        }
    }

    bool Patient::operator==(char letter) const
    {
        return letter == type();
    }

    bool Patient::operator==(const Patient& obj) const
    {
        bool similar = false;
        if (type() == obj.type()) similar = true;

        return similar;
    }

    void Patient::setArrivalTime()
    {
        m_ticket.resetTime(); //sets time to current time
    }

    Patient::operator Time() const
    {
        return Time(m_ticket); //returns time of current obj
    }

    const int Patient::number() const
    {
        return m_ticket.number(); //returns ticket number of current obj
    }

    std::ostream& Patient::csvWrite(std::ostream& ostr) const
    {
        ostr << type() << ',' << m_name << ',' << m_ohip << ',';
        m_ticket.csvWrite(ostr);//ticket object csvWrite function called
        
        return ostr;
    }

    std::istream& Patient::csvRead(std::istream& istr)
    {
        string read;
        //get name
        delete[] m_name;
        getline(istr, read, ',');
        m_name = new char[strlen(read.c_str()) + 1];
        strcpy(m_name, read.c_str());

        //get ohip
        getline(istr, read, ',');
        if (strlen(read.c_str()) > 0) {//if something was read only then store to member variable
            m_ohip = stoi(read);
        }
        m_ticket.csvRead(istr);//ticket object csvRead function called

        return istr;
    }

    std::ostream& Patient::write(std::ostream& ostr) const
    {
        m_ticket.write(ostr);//ticket object write function called
        ostr << '\n';
        if (strlen(m_name) > 25) for (int i = 0; i < 25; ostr << m_name[i++]); //if length is greater than 25 then print up to 25 chars
        else ostr << m_name;
        ostr << ", OHIP: " << m_ohip;

        return ostr;
    }

    std::istream& Patient::read(std::istream& istr)
    {
        string read;
        //get name
        delete[] m_name;
        cout << "Name: ";
        getline(istr, read);
        m_name = new char[strlen(read.c_str()) + 1];
        strcpy(m_name, read.c_str());

        //get ohip
        m_ohip = getInt(100000000, 999999999, "OHIP: ", "Invalid OHIP Number, "); //use of overloaded getInt functin to get ohip number of 9 digits

        return istr;
    }

}