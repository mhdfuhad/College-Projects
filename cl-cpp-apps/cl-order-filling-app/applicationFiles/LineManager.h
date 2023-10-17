// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 01/08/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#ifndef SDDS_LineManager_h
#define SDDS_LineManager_h

#include <vector>
#include "Workstation.h"

namespace sdds{

class LineManager{
    std::vector<Workstation*> activeLine;
    size_t m_cntCustomerOrder{0};
    Workstation* m_firstStation{nullptr};
public:
    LineManager(const std::string& file, const std::vector<Workstation*>& stations);
    void linkStations();
    bool run(std::ostream& os);
    void display(std::ostream& os) const;
};

}

#endif /* SDDS_LineManager_h */
