/* Student Information
Name: Mohammad Fuhad Uddin
Student ID: 135341196
Seneca Email: fmohammad15@myseneca.ca
Date: 16/03/2021
*/

/* Citation and Sources...
Final Project Milestone 1
Module: Utils
Filename: Utils.cpp
Version 1.3
Author	Mohammad Fuhad Uddin
Revision History
-----------------------------------------------------------
Date        Reason
2020/03/30  getInt function exception handling added for use of stoi()
2020/03/24  getInt function can handle only newline character input
2020/03/22  getInt function logic updated to accept negative integers 
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my workshops and assignments.
-----------------------------------------------------------*/

#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>
#include <cstring>
#include <stdexcept>   
#include "utils.h"
#include "Time.h"
using namespace std;
namespace sdds {
   bool debug = false;  // made global in utils.h
   int getTime() {  
      int mins = -1;
      if (debug) {
         Time t(0);
         cout << "Enter current time: ";
         do {
            cin.clear();
            cin >> t;   // needs extraction operator overloaded for Time
            if (!cin) {
               cout << "Invalid time, try again (HH:MM): ";
               cin.clear();
            }
            else {
               mins = int(t);
            }
            cin.ignore(1000, '\n');
         } while (mins < 0);
      }
      else {
         time_t t = time(NULL);
         tm lt = *localtime(&t);
         mins = lt.tm_hour * 60 + lt.tm_min;
      }
      return mins;
   }

   int getInt(const char* prompt) {
       string num;
       int m_num;
       bool check = true;
       if (prompt) {
           cout << prompt;
       }
       while (check) {
           getline(cin, num);
           unsigned int i;
           bool flag = true;
           unsigned int size = strlen(num.c_str());
           if (size == 0) {//if user just enters newline character
               num[0] = 'X';
               size = strlen(num.c_str());
           }
           bool negative = num[0] == '-'; //to differentiate between a signed numbers
           for (i = negative ? 1 : 0; i < size && flag; i++) { 
               if ((isdigit(num[0]) || negative)) {   //check first character is an integer or negative sign
                   if (!isdigit(num[i])) {    //checks the rest of the characters if not integer then prompt for re-entry
                       cout << "Enter only an integer, try again: ";
                       flag = false;    
                   }
               }
               else if (flag) { //if first character itself is not an integer prompt for re-entry
                   cout << "Bad integer value, try again: ";
                   flag = false;
               }
           };

           if (flag) {  
               check = false; //to exit while loop
               try {
                   m_num = stoi(num); //will convert the input from string to integer
               }
               catch (out_of_range& e) {
                   cout << "The value is out of range, click ENTER and try again.";
                   check = true;
               }
           }
       }
       return m_num;
   };

   int getInt(int min, int max, const char* prompt, const char* errorMessage, bool showRangeAtError) {
       int value = getInt(prompt); 
       while (value > max || value < min) { //loop runs if value not within range
           if (errorMessage) {
               cout << errorMessage;
               if (showRangeAtError) {
                   cout << "[" << min << " <= value <= " << max << "]: ";
                   value = getInt();
               }
               else {
                   value = getInt();
               }
           }
       }
       return value;
   };

   char* getcstr(const char* prompt, std::istream& istr, char delimiter) {
       char* line = nullptr;
       if (prompt) {
           cout << prompt;
           string linestr;
           getline(istr, linestr, delimiter); //reads line until delimiter is entered
           line = new char[strlen(linestr.c_str()) + 1];
           strcpy(line, linestr.c_str());
       }
       return line;
   }
}