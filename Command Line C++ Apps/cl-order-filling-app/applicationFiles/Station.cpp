// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 17/07/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <iostream>
#include <iomanip>
#include "Station.h"
#include "Utilities.h"

namespace sdds{

size_t Station::m_widthField = 0;
int Station::id_generator = 0;

Station::Station(const std::string& str){
    Utilities obj;
    size_t pos = 0;
    bool more = true;
    try{
        m_name = obj.extractToken(str, pos, more);
        m_serial = stoi(obj.extractToken(str, pos, more));
        m_stock = stoi(obj.extractToken(str, pos, more));
        if (m_widthField < obj.getFieldWidth())
            m_widthField = obj.getFieldWidth();
        m_desc = obj.extractToken(str, pos, more);
    }
    catch(std::string& err){
        std::cout << err << std::endl;
    }
    m_id = ++id_generator;
};

const std::string& Station::getItemName() const{
    return m_name;
};

size_t Station::getNextSerialNumber(){
    return m_serial++;
};

size_t Station::getQuantity() const{
    return m_stock;
};

void Station::updateQuantity(){
    if (m_stock > 0)
        m_stock -= 1;
};

void Station::display(std::ostream& os, bool full) const{
    os << "[" << std::setw(3) << std::setfill('0') << std::right << m_id << "] Item: " << std::setfill(' ');
    os << std::setw(int(m_widthField)) << std::left << m_name;
    os << " [" << std::setw(6) << std::setfill('0') << std::right << m_serial << "]" << std::setfill(' ');
    if(full){
        os << " Quantity: " << std::setw(int(m_widthField)) << std::left << m_stock;
        os << " Description: " << m_desc;
    }
    os << '\n';
};

}
