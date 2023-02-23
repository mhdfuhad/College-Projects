// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 17/07/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#ifndef SDDS_Utilities_h
#define SDDS_Utilities_h

#include <string>

namespace sdds{

class Utilities {
    size_t m_widthField{1};
    static char m_delimiter;
public:
    void setFieldWidth(size_t newWidth);
    size_t getFieldWidth() const;
    std::string extractToken(const std::string& str, size_t& next_pos, bool& more);
    static void setDelimiter(char newDelimiter);
    static char getDelimiter();
};

}

#endif /* SDDS_Utilities_h */
