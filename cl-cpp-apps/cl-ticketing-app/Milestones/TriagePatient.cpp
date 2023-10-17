/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 30/03/2021
*/

/* Citation and Sources...
Final Project Milestone 4
Module: TriagePatient
Filename: TriagePatient.cpp
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
#include <iostream>
#include "TriagePatient.h"

using namespace std;
namespace sdds {
   int nextTriageTicket = 1;

   TriagePatient::TriagePatient() :Patient(nextTriageTicket), m_symptoms(nullptr)
   {
	   nextTriageTicket++;
   }

   TriagePatient::~TriagePatient()
   {
	   delete[] m_symptoms;
	   m_symptoms = nullptr;
   }

   char TriagePatient::type() const
   {
	   return 'T';
   }

   std::ostream& TriagePatient::csvWrite(std::ostream& ostr) const
   {
	   Patient::csvWrite(ostr);
	   ostr << ',' << m_symptoms;

	   return ostr;
   }

   std::istream& TriagePatient::csvRead(std::istream& istr)
   {
	   string read;
	   delete[] m_symptoms;
	   Patient::csvRead(istr);
	   istr.ignore();
	   getline(istr, read);
	   m_symptoms = new char[strlen(read.c_str()) + 1];
	   strcpy(m_symptoms, read.c_str());

	   nextTriageTicket = Patient::number() + 1;

	   return istr;
   }

   std::ostream& TriagePatient::write(std::ostream& ostr) const
   {
	   if (Patient::fileIO()) {
		   csvWrite(ostr);
	   }
	   else {
		   ostr << "TRIAGE" << endl;
		   Patient::write(ostr) << endl;
		   ostr << "Symptoms: " << m_symptoms << endl;
	   }

	   return ostr;
   }

   std::istream& TriagePatient::read(std::istream& istr)
   {
	   if (Patient::fileIO()) {
		   csvRead(istr);
	   }
	   else {
		   string read;
		   delete[] m_symptoms;
		   Patient::read(istr);
		   cout << "Symptoms: ";
		   getline(istr, read);
		   m_symptoms = new char[strlen(read.c_str()) + 1];
		   strcpy(m_symptoms, read.c_str());
	   }

	   return istr;
   }

}