// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 17/07/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#ifndef SDDS_Station_h
#define SDDS_Station_h

#include <string>

namespace sdds{

class Station {
    int m_id{0};
    std::string m_name;
    std::string m_desc;
    size_t m_serial{0};
    size_t m_stock{0};
    static size_t m_widthField;
    static int id_generator;
public:
    Station(const std::string& str);
    const std::string& getItemName() const;
    size_t getNextSerialNumber();
    size_t getQuantity() const;
    void updateQuantity();
    void display(std::ostream& os, bool full) const;
};

}

#endif /* SDDS_Station_h */
