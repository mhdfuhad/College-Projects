// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 01/08/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <iostream>
#include "Workstation.h"

namespace sdds{

std::deque<CustomerOrder> pending;
std::deque<CustomerOrder> completed;
std::deque<CustomerOrder> incomplete;

Workstation::Workstation(const std::string& str) : Station(str) {};

void Workstation::fill(std::ostream& os){
    if(!m_orders.empty())
        m_orders.front().fillItem(*this, os);
};

bool Workstation::attemptToMoveOrder(){
    if(!m_orders.empty()){
        if (m_orders.front().isItemFilled(getItemName()) || getQuantity() <= 0){
            if(m_pNextStation == nullptr)
                if(m_orders.front().isFilled())
                    completed.push_back(std::move(m_orders.front()));
                else
                    incomplete.push_back(std::move(m_orders.front()));
            else
                *m_pNextStation += std::move(m_orders.front());
            
            m_orders.pop_front();
            return true;
        }
    }
    return false;
};

void Workstation::setNextStation(Workstation* station){
    m_pNextStation = station;
};

Workstation* Workstation::getNextStation() const{
    return m_pNextStation;
};

void Workstation::display(std::ostream& os) const{
    os << getItemName() << " --> ";
    os << (m_pNextStation == nullptr ? "End of Line" : m_pNextStation->getItemName());
    os << std::endl;
};

Workstation& Workstation::operator+=(CustomerOrder&& newOrder){
    m_orders.push_back(std::move(newOrder));
    return *this;
};

}
