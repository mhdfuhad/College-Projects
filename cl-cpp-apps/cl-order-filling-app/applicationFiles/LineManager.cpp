// Name: Mohammad Fuhad Uddin
// Seneca Student ID: 135341196
// Seneca email: fmohammad15@myseneca.ca
// Date of completion: 01/08/21
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include "Utilities.h"
#include "LineManager.h"

namespace sdds{

LineManager::LineManager(const std::string& file, const std::vector<Workstation*>& stations){
    try{
        m_cntCustomerOrder = pending.size();
        std::ifstream read(file);
        std::string temp, curStation, nextStation;
        Utilities obj;
        
        while(getline(read, temp, '\n')){
            size_t pos = 0;
            bool more = true;
            curStation = obj.extractToken(temp, pos, more);
            for_each(stations.begin(), stations.end(),[&](Workstation* st1){
                if(st1->getItemName() == curStation){
                    if(more){
                        nextStation = obj.extractToken(temp, pos, more);
                        for_each(stations.begin(), stations.end(),[&](Workstation* st2){
                            if(st2->getItemName() == nextStation)
                                st1->setNextStation(st2);
                        });
                    }
                    activeLine.push_back(std::move(st1));
                }
            });
            m_firstStation = activeLine.front();
        }
    }
    catch(...){
        throw ("Error processing files contents.");
    }
};

void LineManager::linkStations(){
    std::vector<Workstation*> sorted{m_firstStation};
    for(size_t i = 0; i < activeLine.size(); i++)
        if(sorted[i]->getNextStation())
            sorted.push_back(sorted[i]->getNextStation());
    activeLine = sorted;
};

bool LineManager::run(std::ostream& os){
    static size_t iterationCnt = 0;
    os << "Line Manager Iteration: " << ++iterationCnt << std::endl;
    
    if(!pending.empty()){
        *m_firstStation += std::move(pending.front());
        pending.pop_front();
    }
    
    for_each(activeLine.begin(), activeLine.end(), [&](Workstation* obj){
        obj->fill(os);
    });
    
    for_each(activeLine.begin(), activeLine.end(), [&](Workstation* obj){
        obj->attemptToMoveOrder();
    });
    
    return completed.size() + incomplete.size() == m_cntCustomerOrder;
};

void LineManager::display(std::ostream& os) const{
    for_each(activeLine.begin(), activeLine.end(), [&](const Workstation* obj){
        obj->display(os);
    });
};

}
