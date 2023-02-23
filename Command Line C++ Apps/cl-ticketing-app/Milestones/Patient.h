/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 24/03/2021
*/

/* Citation and Sources...
Final Project Milestone 3
Module: Patient
Filename: Patient.h
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

#ifndef SDDS_PATIENT_H
#define SDDS_PATIENT_H
#include <iostream>
#include "IOAble.h"
#include "Ticket.h"
namespace sdds {
	class Patient : public IOAble {
		char* m_name{ nullptr };
		int m_ohip{ 0 };
		Ticket m_ticket;
		bool m_IOflag; //true if object needs to read from file false otherwise
	public:
		Patient(int tnumber = 0, bool flag = "false");
		~Patient();
		//copy prevention
		Patient(const Patient& obj) = delete;
		Patient& operator=(const Patient& obj) = delete;
		//pure virtual function
		virtual char type()const = 0;
		//member functions
		const bool fileIO() const; //query
		void fileIO(bool valid); //modifier
		bool operator==(char letter) const;
		bool operator==(const Patient& obj) const;
		void setArrivalTime(); //modifier
		operator Time() const; //query
		const int number() const; //query
		std::ostream& csvWrite(std::ostream& ostr) const;
		std::istream& csvRead(std::istream& istr);
		std::ostream& write(std::ostream& ostr) const;
		std::istream& read(std::istream& istr);
	};
}
#endif // !SDDS_PATIENT_H