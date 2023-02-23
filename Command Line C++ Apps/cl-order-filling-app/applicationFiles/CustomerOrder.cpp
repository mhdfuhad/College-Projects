// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 25/07/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <utility>
#include <iostream>
#include <iomanip>
#include "CustomerOrder.h"
#include "Utilities.h"

namespace sdds{
size_t CustomerOrder::m_widthField = 0;

CustomerOrder::CustomerOrder(const std::string& str){
    Utilities obj;
    size_t pos = 0;
    bool more = true;
    
    m_name = obj.extractToken(str, pos, more);
    m_product = obj.extractToken(str, pos, more);
    
    size_t tempPos = pos;
    while(more && !obj.extractToken(str, pos, more).empty()) //count all items
        m_cntItem += 1;
    
    m_lstItem = new Item*[m_cntItem]; //dynamically allocate memory for items
    more = true; //reset more
    for (size_t i = 0; i < m_cntItem; i++) //loop to add all items into itemlist pointer
        m_lstItem[i] = new Item(obj.extractToken(str, tempPos, more));
    
    m_widthField = obj.getFieldWidth() > m_widthField ? obj.getFieldWidth() : m_widthField;
};

CustomerOrder::CustomerOrder(const CustomerOrder& obj){
    throw std::string("Cannot make copies.");
};

CustomerOrder::CustomerOrder(CustomerOrder&& obj) noexcept{
    *this = std::move(obj);
};

CustomerOrder& CustomerOrder::operator=(CustomerOrder&& obj) noexcept{
    if(this != &obj){
        if (m_lstItem)
            for (size_t i = 0; i < m_cntItem; i++)
                delete m_lstItem[i];
        delete[] m_lstItem;
        
        m_name = obj.m_name;
        m_product = obj.m_product;
        m_cntItem = obj.m_cntItem;
        m_lstItem = obj.m_lstItem;
        m_widthField = obj.m_widthField;
        
        //empty src object
        obj.m_name = {};
        obj.m_product = {};
        obj.m_cntItem = 0;
        obj.m_lstItem = nullptr;
    }
    return *this;
};

CustomerOrder::~CustomerOrder(){
    for (size_t i = 0; i < m_cntItem; i++)
        delete m_lstItem[i];
    delete[] m_lstItem;
};

bool CustomerOrder::isFilled() const{
    for(size_t i = 0; i < m_cntItem; i++)
        if(!m_lstItem[i]->m_isFilled)
            return false;
    return true;
};

bool CustomerOrder::isItemFilled(const std::string& itemName) const{
    for(size_t i = 0; i < m_cntItem; i++)
        if(m_lstItem[i]->m_itemName == itemName && !m_lstItem[i]->m_isFilled)
            return false;
    return true;
};

void CustomerOrder::fillItem(Station& station, std::ostream& os){
    for (size_t i = 0; i < m_cntItem; i++){
        if (station.getItemName() == m_lstItem[i]->m_itemName){
            if (station.getQuantity() > 0){
                station.updateQuantity(); //remove one from inventory
                m_lstItem[i]->m_serialNumber = station.getNextSerialNumber(); //update serial
                m_lstItem[i]->m_isFilled = true; //update isfilled
                os << "    Filled " << m_name << ", " << m_product;
                os << " [" << m_lstItem[i]->m_itemName << "]" << std::endl;
            }
            else{
                os << "    Unable to fill " << m_name << ", " << m_product;
                os << " [" << m_lstItem[i]->m_itemName << "]" << std::endl;
            }
        }
    }
};

void CustomerOrder::display(std::ostream& os) const{
    os << m_name << " - " << m_product << std::endl;
    for(size_t i = 0; i < m_cntItem; i++){
        os << "[" << std::setw(6) << std::setfill('0') << std::right << m_lstItem[i]->m_serialNumber << "] " << std::setfill(' ');
        os << std::setw((int)m_widthField) << std::left << m_lstItem[i]->m_itemName;
        os << " - " << (m_lstItem[i]->m_isFilled ? "FILLED" : "TO BE FILLED") << std::endl;
    }
};

}
