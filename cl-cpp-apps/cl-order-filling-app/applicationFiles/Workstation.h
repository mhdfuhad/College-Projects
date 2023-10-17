// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 01/08/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#ifndef SDDS_Workstation_h
#define SDDS_Workstation_h

#include <deque>
#include <string>
#include "CustomerOrder.h"
#include "Station.h"

namespace sdds{
//global variables
extern std::deque<CustomerOrder> pending;
extern std::deque<CustomerOrder> completed;
extern std::deque<CustomerOrder> incomplete;

class Workstation : public Station{
    std::deque<CustomerOrder> m_orders;
    Workstation* m_pNextStation{nullptr};
public:
    Workstation(const std::string& str);
    void fill(std::ostream& os);
    bool attemptToMoveOrder();
    void setNextStation(Workstation* station = nullptr);
    Workstation* getNextStation() const;
    void display(std::ostream& os) const;
    Workstation& operator+=(CustomerOrder&& newOrder);
    
    //copy/move functionality disabled
    Workstation(const Workstation& src) = delete;
    Workstation& operator=(Workstation& src) = delete;
    Workstation(Workstation&& src) = delete;
    Workstation& operator=(Workstation&& src) = delete;
};

}

#endif /* SDDS_Workstation_h */
