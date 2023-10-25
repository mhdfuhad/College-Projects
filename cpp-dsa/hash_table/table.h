/*************************************************************/
/*                                                           */
/*                                                           */
/*  Author1 Name: Mohammad Fuhad Uddin                       */
/*      - class/function list/main author or main checker    */
/*                                                           */
/*************************************************************/

#include <string>
#include <utility>
#include <functional>
#include "mylist.h"

template <class TYPE>
class Table
{
public:
    Table() {}
    virtual bool update(const std::string &key, const TYPE &value) = 0;
    virtual bool remove(const std::string &key) = 0;
    virtual bool find(const std::string &key, TYPE &value) = 0;
    virtual int numRecords() const = 0;
    virtual bool isEmpty() const = 0;
    virtual int capacity() const = 0;
    virtual ~Table() {}
};

template <class TYPE>
class SimpleTable : public Table<TYPE>
{

    struct Record
    {
        TYPE data_;
        std::string key_;
        Record(const std::string &key, const TYPE &data)
        {
            key_ = key;
            data_ = data;
        }
    };

    Record **records_; // the table
    int capacity_;     // capacity of the array

public:
    SimpleTable(int capacity);
    SimpleTable(const SimpleTable &rhs);
    SimpleTable(SimpleTable &&rhs);
    virtual bool update(const std::string &key, const TYPE &value);
    virtual bool remove(const std::string &key);
    virtual bool find(const std::string &key, TYPE &value);
    virtual const SimpleTable &operator=(const SimpleTable &rhs);
    virtual const SimpleTable &operator=(SimpleTable &&rhs);
    virtual ~SimpleTable();
    virtual bool isEmpty() const { return numRecords() == 0; }
    virtual int numRecords() const;
    virtual int capacity() const { return capacity_; }
};

template <class TYPE>
int SimpleTable<TYPE>::numRecords() const
{
    int rc = 0;
    for (int i = 0; records_[i] != nullptr; i++)
    {
        rc++;
    }
    return rc;
}

template <class TYPE>
SimpleTable<TYPE>::SimpleTable(int capacity) : Table<TYPE>()
{
    records_ = new Record *[capacity + 1];
    capacity_ = capacity;
    for (int i = 0; i < capacity_ + 1; i++)
    {
        records_[i] = nullptr;
    }
}

template <class TYPE>
SimpleTable<TYPE>::SimpleTable(const SimpleTable<TYPE> &rhs)
{
    records_ = new Record *[rhs.capacity_ + 1];
    capacity_ = rhs.capacity_;
    for (int i = 0; i < capacity_ + 1; i++)
    {
        records_[i] = nullptr;
    }
    for (int i = 0; i < rhs.numRecords(); i++)
    {
        update(rhs.records_[i]->key_, rhs.records_[i]->data_);
    }
}
template <class TYPE>
SimpleTable<TYPE>::SimpleTable(SimpleTable<TYPE> &&rhs)
{
    capacity_ = rhs.capacity_;
    records_ = rhs.records_;
    rhs.records_ = nullptr;
    rhs.capacity_ = 0;
}

template <class TYPE>
bool SimpleTable<TYPE>::update(const std::string &key, const TYPE &value)
{
    int idx = -1;
    int sz = numRecords();
    bool rc = true;
    for (int i = 0; i < sz; i++)
    {
        if (records_[i]->key_ == key)
        {
            idx = i;
        }
    }
    if (idx == -1)
    {
        if (sz < capacity_)
        {
            records_[numRecords()] = new Record(key, value);
            for (int i = numRecords() - 1; i > 0 && records_[i]->key_ < records_[i - 1]->key_; i--)
            {
                Record *tmp = records_[i];
                records_[i] = records_[i - 1];
                records_[i - 1] = tmp;
            }
        }
        else
        {
            rc = false;
        }
    }
    else
    {
        records_[idx]->data_ = value;
    }
    return rc;
}

template <class TYPE>
bool SimpleTable<TYPE>::remove(const std::string &key)
{
    int idx = -1;
    int size = numRecords();
    for (int i = 0; records_[i] != nullptr; i++)
    {
        if (records_[i]->key_ == key)
        {
            idx = i;
        }
    }
    if (idx != -1)
    {
        delete records_[idx];

        for (int i = idx; i < numRecords() - 1; i++)
        {
            records_[i] = records_[i + 1];
        }
        records_[size - 1] = nullptr;
        return true;
    }
    else
    {
        return false;
    }
}

template <class TYPE>
bool SimpleTable<TYPE>::find(const std::string &key, TYPE &value)
{
    int idx = -1;
    for (int i = 0; i < numRecords(); i++)
    {
        if (records_[i]->key_ == key)
        {
            idx = i;
        }
    }
    if (idx == -1)
        return false;
    else
    {
        value = records_[idx]->data_;
        return true;
    }
}

template <class TYPE>
const SimpleTable<TYPE> &SimpleTable<TYPE>::operator=(const SimpleTable<TYPE> &rhs)
{
    if (this != &rhs)
    {
        if (records_)
        {
            while (numRecords() != 0)
            {
                remove(records_[0]->key_);
            }
            delete[] records_;
        }
        records_ = new Record *[rhs.capacity_ + 1];
        capacity_ = rhs.capacity_;
        for (int i = 0; i < capacity_; i++)
        {
            records_[i] = nullptr;
        }
        for (int i = 0; i < rhs.numRecords(); i++)
        {
            update(rhs.records_[i]->key_, rhs.records_[i]->data_);
        }
    }
    return *this;
}
template <class TYPE>
const SimpleTable<TYPE> &SimpleTable<TYPE>::operator=(SimpleTable<TYPE> &&rhs)
{
    if (records_)
    {
        while (numRecords() != 0)
        {
            remove(records_[0]->key_);
        }
        delete[] records_;
    }
    records_ = rhs.records_;
    capacity_ = rhs.capacity_;
    rhs.records_ = nullptr;
    rhs.capacity_ = 0;

    return *this;
}
template <class TYPE>
SimpleTable<TYPE>::~SimpleTable()
{
    if (records_)
    {
        int sz = numRecords();
        for (int i = 0; i < sz; i++)
        {
            remove(records_[0]->key_);
        }
        delete[] records_;
    }
}

template <class TYPE>
class ChainingTable : public Table<TYPE>
{
    DList<TYPE> **records_;       // array of pointers to DList
    int capacity_;                // capacity of the array
    std::hash<std::string> hash_; // hash function
    int numRecords_;              // number of records in the table

public:
    ChainingTable(int maxExpected);
    ChainingTable(const ChainingTable &other);
    ChainingTable(ChainingTable &&other);
    double loadFactor() const;
    virtual bool update(const std::string &key, const TYPE &value);
    virtual bool remove(const std::string &key);
    virtual bool find(const std::string &key, TYPE &value);
    virtual const ChainingTable &operator=(const ChainingTable &other);
    virtual const ChainingTable &operator=(ChainingTable &&other);
    virtual ~ChainingTable();
    virtual bool isEmpty() const;
    virtual int numRecords() const;
    virtual int capacity() const;
};

// Constructor
// Preconditions: None
// Postconditions: Table is created with the given capacity
// Parameters: capacity - the capacity of the table
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
ChainingTable<TYPE>::ChainingTable(int capacity) : Table<TYPE>()
{
    capacity_ = capacity;
    records_ = new DList<TYPE> *[capacity_ + 1];
    numRecords_ = 0;
    for (int i = 0; i < capacity_ + 1; i++)
    {
        records_[i] = nullptr;
    }
}

// Copy Constructor
// Preconditions: None
// Postconditions: Table is a copy of other
// Parameters: other - the ChainingTable to copy
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
ChainingTable<TYPE>::ChainingTable(const ChainingTable<TYPE> &other)
{
    *this = other;
}

// Move Constructor
// Preconditions: None
// Postconditions: Table is moved from other to this
// Parameters: other - the ChainingTable to move
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
ChainingTable<TYPE>::ChainingTable(ChainingTable<TYPE> &&other)
{
    *this = std::move(other);
}

// Update function
// Preconditions: None
// Postconditions: If key is in the table, the value is updated.
//                 If key is not in the table, the key-value pair is added.
// Parameters: key - the key to update
//             value - the value to update
// Returns: true if the key is in the table, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool ChainingTable<TYPE>::update(const std::string &key, const TYPE &value)
{
    int idx = hash_(key) % capacity_;
    if (records_[idx] != nullptr)
    {
        auto it = records_[idx]->search(key); // uses the Dlist search function to get an iterator to the key in the Dlist
        if (it != records_[idx]->end())
        {
            records_[idx]->erase(it); // erase the key-value pair from the Dlist using the iterator returned by the search function passed into the erase function defined in Dlist class
            numRecords_--;
        }

        if (records_[idx]->empty()) // if the Dlist is empty, delete the Dlist and set the pointer to nullptr
        {
            delete records_[idx];
            records_[idx] = nullptr;
            records_[idx] = new DList<TYPE>();
        }
    }
    else
    {
        records_[idx] = new DList<TYPE>();
    }

    if (records_[idx]->push_front(key, value))
    { // push the key-value pair to the front of the Dlist
        numRecords_++;
        return true;
    }
    else
    {
        return false;
    }
}

// Remove function
// Preconditions: None
// Postconditions: If key is in the table, the key-value pair is removed.
//                 If key is not in the table, nothing happens.
// Parameters: key - the key to remove
// Returns: true if the key is in the table, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool ChainingTable<TYPE>::remove(const std::string &key)
{
    if (numRecords_ == 0)
    {
        return false;
    }
    int idx = hash_(key) % capacity_;
    if (records_[idx] != nullptr)
    {
        auto it = records_[idx]->search(key);
        if (it != records_[idx]->end())
        {
            records_[idx]->erase(it);
            if (records_[idx]->empty())
            {
                delete records_[idx];
                records_[idx] = nullptr;
                numRecords_--;
            }
            return true;
        }
    }
    return false;
}

// Find function
// Preconditions: None
// Postconditions: If key is in the table, the value is returned and updated to passed in value.
//                 If key is not in the table, value is unchanged.
// Parameters: key - the key to find
//             value - the value to return
// Returns: true if the key is in the table, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool ChainingTable<TYPE>::find(const std::string &key, TYPE &value)
{
    if (numRecords_ == 0) // if there are no records, nothing to search for
    {
        return false;
    }
    int idx = hash_(key) % capacity_;
    if (records_[idx] != nullptr)
    {
        if (records_[idx]->search(key) != records_[idx]->end())
        {
            value = (*records_[idx]->search(key));
            return true;
        }
        else
        {
            return false;
        }
    }
    return false;
}

// Copy Assignment Operator
// Preconditions: None
// Postconditions: Table is a copy of other
// Parameters: other - the ChainingTable to copy
// Returns: *this
// Exceptions: none
// Notes: None
template <class TYPE>
const ChainingTable<TYPE> &ChainingTable<TYPE>::operator=(const ChainingTable<TYPE> &other)
{
    if (this != &other)
    {
        records_ = new DList<TYPE> *[other.capacity_ + 1];
        capacity_ = other.capacity_;
        numRecords_ = 0;

        for (int i = 0; i < capacity_ + 1; i++)
        {
            records_[i] = nullptr;
        }
        for (int i = 0; i < other.capacity_; i++)
        {
            if (other.records_[i] != nullptr)
            {
                for (auto temp = other.records_[i]->begin(); temp != other.records_[i]->end(); ++temp)
                {
                    update(temp.key(), *temp);
                }
            }
        }
    }
    return *this;
}

// Move Assignment Operator
// Preconditions: None
// Postconditions: Table is moved from other to this
// Parameters: other - the ChainingTable to move
// Returns: *this
// Exceptions: none
// Notes: None
template <class TYPE>
const ChainingTable<TYPE> &ChainingTable<TYPE>::operator=(ChainingTable<TYPE> &&other)
{
    if (this != &other)
    {
        records_ = other.records_;
        capacity_ = other.capacity_;
        numRecords_ = other.numRecords_;
        other.records_ = nullptr;
        other.capacity_ = 0;
    }

    return *this;
}

// Destructor
// Preconditions: None
// Postconditions: Table is destroyed
// Parameters: None
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
ChainingTable<TYPE>::~ChainingTable()
{
    if (records_)
    {
        for (int i = 0; i < capacity_; i++)
        {
            if (records_[i] != nullptr)
            {
                while (!records_[i]->empty())
                {
                    records_[i]->erase(records_[i]->begin());
                }
                delete records_[i];
            }
        }
        delete[] records_;
    }
}

// Empty Function
// Preconditions: None
// Postconditions: Returns true if table is empty, false otherwise
// Parameters: None
// Returns: true if table is empty, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool ChainingTable<TYPE>::isEmpty() const
{
    return (numRecords_ == 0) ? true : false;
}

// Number of Records Function
// Preconditions: None
// Postconditions: Returns the number of records in the table
// Parameters: None
// Returns: the number of records in the table
// Exceptions: none
// Notes: None
template <class TYPE>
int ChainingTable<TYPE>::numRecords() const
{
    return numRecords_;
}

// Capacity of Table function
// Preconditions: None
// Postconditions: Returns the capacity of the table
// Parameters: None
// Returns: the capacity of the table
// Exceptions: none
// Notes: None
template <class TYPE>
int ChainingTable<TYPE>::capacity() const
{
    return capacity_;
}

// Load Factor Function
// Preconditions: None
// Postconditions: Returns the load factor of the table
// Parameters: None
// Returns: the load factor of the table
// Exceptions: none
// Notes: None
template <class TYPE>
double ChainingTable<TYPE>::loadFactor() const
{
    return (double)numRecords_ / capacity_;
}

template <class TYPE>
class LPTable : public Table<TYPE>
{
    struct Record
    {
        TYPE data_;
        std::string key_;
        Record(const std::string &key, const TYPE &data)
        {
            key_ = key;
            data_ = data;
        }
    };

    Record **records_;            // Array of pointers to records
    int capacity_;                // Capacity of the table
    std::hash<std::string> hash_; // Hash function
    int removeHelper;             // Helper variable for remove
    int numRecords_;              // Number of records in the table

public:
    LPTable(int maxExpected);
    LPTable(const LPTable &other);
    LPTable(LPTable &&other);
    double loadFactor() const;
    virtual bool update(const std::string &key, const TYPE &value);
    virtual bool remove(const std::string &key);
    virtual bool find(const std::string &key, TYPE &value);
    virtual const LPTable &operator=(const LPTable &other);
    virtual const LPTable &operator=(LPTable &&other);
    virtual ~LPTable();
    virtual bool isEmpty() const;
    virtual int numRecords() const;
    virtual int capacity() const;
};

// Constructor
// Preconditions: None
// Postconditions: Table is created with the given capacity
// Parameters: capacity - the capacity of the table
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
LPTable<TYPE>::LPTable(int capacity) : Table<TYPE>()
{
    records_ = new Record *[capacity + 1];
    capacity_ = capacity;
    removeHelper = -1;
    numRecords_ = 0;
    for (int i = 0; i < capacity_; i++)
    {
        records_[i] = nullptr;
    }
}

// Copy Constructor
// Preconditions: None
// Postconditions: Table is a copy of other
// Parameters: other - the LPTable to copy
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
LPTable<TYPE>::LPTable(const LPTable<TYPE> &other)
{
    *this = other;
}

// Move Constructor
// Preconditions: None
// Postconditions: Table is moved from other to this
// Parameters: other - the LPTable to move
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
LPTable<TYPE>::LPTable(LPTable<TYPE> &&other)
{
    *this = std::move(other);
}

// Update Function
// Preconditions: None
// Postconditions: If key is in the table, the value is updated else a new record is added if there is space
// Parameters: key - the key of the record to update
//             value - the value to update the record with
// Returns: true if the record was updated or added, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool LPTable<TYPE>::update(const std::string &key, const TYPE &value)
{
    int idx = hash_(key) % capacity_;
    if (records_[idx] == nullptr && numRecords_ < capacity_ - 1)
    {
        records_[idx] = new Record(key, value);
        numRecords_++;
        return true;
    }
    else
    {
        while (records_[idx] != nullptr)
        {
            if (records_[idx]->key_ == key)
            {
                records_[idx]->data_ = value;
                return true;
            }
            idx++;
            idx %= capacity_;
        }
        if (numRecords_ < capacity_ - 1)
        {
            records_[idx] = new Record(key, value);
            numRecords_++;
            return true;
        }
        return false;
    }
}

// Remove Function
// Preconditions: None
// Postconditions: If key is in the table, the record is removed
// Parameters: key - the key of the record to remove
// Returns: true if the record was removed, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool LPTable<TYPE>::remove(const std::string &key)
{
    bool removed = false;
    TYPE dummy;           // dummy variable to hold value of removed record that is not used but passed to the find function
    if (find(key, dummy)) // use the find function to make sure the record exists and for the removeHelper to have a value that can be used for easy removal
    {
        if (records_[removeHelper] != nullptr)
        {
            delete records_[removeHelper];
            records_[removeHelper] = nullptr;
            removed = true;
            numRecords_--;
        }
    }

    return removed;
}

// Find Function
// Preconditions: None
// Postconditions: If key is in the table, the value is returned in value
// Parameters: key - the key of the record to find
//             value - the value of the record to find
// Returns: true if the record was found, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool LPTable<TYPE>::find(const std::string &key, TYPE &value)
{
    removeHelper = 0;
    if (numRecords_ == 0)
    {
        return false;
    }

    bool found = false;
    int idx = hash_(key) % capacity_;
    int check = 0; // Variable used for checking the next 100 records that are not nullptr in case the record is not found
    if (records_[idx] == nullptr)
    { // If the record at index is not pointing to anything, increment the index until it is pointing to something
        while (records_[idx] == nullptr && idx < capacity_)
        {
            idx++;
            idx %= capacity_;
        }
    }

    if (records_[idx]->key_ == key)
    {
        value = records_[idx]->data_;
        removeHelper = idx;
        found = true;
    }
    else
    {
        while (records_[idx] != nullptr)
        {
            if (records_[idx]->key_ == key)
            {
                value = records_[idx]->data_;
                removeHelper = idx;
                found = true;
                break;
            }
            idx++;
            idx %= capacity_;
            if (records_[idx] == nullptr && check < 100) // As record might be nullptr the while loop could break instead this loop will increment the index till it finds a non nullptr record or check reaches 100.
            {                                            // This is to check further 100 records to make sure the record is present or not
                while (records_[idx] == nullptr)
                {
                    idx++;
                    idx %= capacity_;
                }
                check++;
            }
        }
    }

    return found;
}

// Copy Assignment Operator
// Preconditions: None
// Postconditions: Table is a copy of other
// Parameters: other - the LPTable to copy
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
const LPTable<TYPE> &LPTable<TYPE>::operator=(const LPTable<TYPE> &other)
{
    if (this != &other)
    {
        records_ = new Record *[other.capacity_];
        capacity_ = other.capacity_;
        numRecords_ = other.numRecords_;
        for (int i = 0; i < capacity_; i++)
        {
            records_[i] = nullptr;
        }
        for (int i = 0; i < other.capacity_; i++)
        {
            if (other.records_[i] != nullptr)
            {
                records_[i] = new Record(other.records_[i]->key_, other.records_[i]->data_);
            }
        }
    }
    return *this;
}

// Move Assignment Operator
// Preconditions: None
// Postconditions: Table is moved from other to this
// Parameters: other - the LPTable to move
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
const LPTable<TYPE> &LPTable<TYPE>::operator=(LPTable<TYPE> &&other)
{
    if (this != &other)
    {
        records_ = other.records_;
        capacity_ = other.capacity_;
        numRecords_ = other.numRecords_;
        other.records_ = nullptr;
        other.capacity_ = 0;
    }
    return *this;
}

// Destructor
// Preconditions: None
// Postconditions: All records are deleted
// Parameters: None
// Returns: None
// Exceptions: none
// Notes: None
template <class TYPE>
LPTable<TYPE>::~LPTable()
{
    for (int i = 0; i < capacity_; i++)
    {
        if (records_[i] != nullptr)
        {
            delete records_[i];
        }
    }
    delete[] records_;
}

// Empty Function
// Preconditions: None
// Postconditions: None
// Parameters: None
// Returns: true if the table is empty, false otherwise
// Exceptions: none
// Notes: None
template <class TYPE>
bool LPTable<TYPE>::isEmpty() const
{
    return (numRecords_ == 0) ? true : false;
}

// Number of Records Function
// Preconditions: None
// Postconditions: None
// Parameters: None
// Returns: the number of records in the table
// Exceptions: none
// Notes: None
template <class TYPE>
int LPTable<TYPE>::numRecords() const
{
    return numRecords_;
}

// Capacity Function
// Preconditions: None
// Postconditions: None
// Parameters: None
// Returns: the capacity of the table
// Exceptions: none
// Notes: None
template <class TYPE>
int LPTable<TYPE>::capacity() const
{
    return capacity_;
}

// Load Factor Function
// Preconditions: None
// Postconditions: None
// Parameters: None
// Returns: the load factor of the table
// Exceptions: none
// Notes: None
template <class TYPE>
double LPTable<TYPE>::loadFactor() const
{
    return (double)numRecords_ / capacity();
}
