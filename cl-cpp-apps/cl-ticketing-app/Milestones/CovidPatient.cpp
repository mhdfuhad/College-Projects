/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 30/03/2021
*/

/* Citation and Sources...
Final Project Milestone 4
Module: CovidPatient
Filename: CovidPatient.cpp
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
#include "CovidPatient.h"
using namespace std;

namespace sdds {
   int nextCovidTicket = 1;


   CovidPatient::CovidPatient(): Patient(nextCovidTicket)
   {
	   nextCovidTicket++;
   }

   char CovidPatient::type()const
   {
	   return 'C';
   }

   std::istream& CovidPatient::csvRead(std::istream& istr)
   {
	   Patient::csvRead(istr);
	   nextCovidTicket = Patient::number() + 1;
	   istr.ignore();

	   return istr;
   }

   std::ostream& CovidPatient::write(std::ostream& ostr) const
   {
	   if (Patient::fileIO()) {
		   Patient::csvWrite(ostr);
	   }
	   else {
		   ostr << "COVID TEST" << endl;
		   Patient::write(ostr) << endl;
	   }

	   return ostr;
   }

   std::istream& CovidPatient::read(std::istream& istr)
   {
	   if (Patient::fileIO()) {
		   csvRead(istr);
	   }
	   else {
		   Patient::read(istr);
	   }

	   return istr;
   }
}