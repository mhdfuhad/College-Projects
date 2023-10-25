
/********************************************************************/
/*                                                                  */
/*	Author: Mohammad Fuhad Uddin									*/
/*	Functions Added-												*/
/*		push_front()												*/
/*		search(key) - string key is passed in     					*/
/*                                                                  */
/********************************************************************/
#include <utility>
#include <iostream>

template <typename T>
class DList
{
	struct Node
	{
		std::string key_;
		T data_;
		Node *next_;
		Node *prev_;
		Node(const std::string &key = "", const T &data = T{}, Node *next = nullptr, Node *prev = nullptr)
			: key_{key}, data_{data}, next_{next}, prev_{prev} {}
	};
	Node *front_;
	Node *back_;

public:
	class const_iterator
	{
		friend class DList;
		Node *curr_;
		const DList *list_;
		const_iterator(Node *n, const DList *l)
		{
			curr_ = n;
			list_ = l;
		}

	public:
		const_iterator()
		{
			curr_ = nullptr;
		}
		const_iterator operator++()
		{
			if (curr_)
			{
				curr_ = curr_->next_;
			}
			return *this;
		}
		const_iterator operator++(int)
		{
			const_iterator temp = *this;
			if (curr_)
			{
				curr_ = curr_->next_;
			}
			return temp;
		}
		const_iterator operator--()
		{
			if (curr_ != nullptr)
			{
				curr_ = curr_->prev_;
			}
			else
			{
				if (list_->back_ != nullptr)
				{
					curr_ = list_->back_;
				}
			}
			return *this;
		}
		const_iterator operator--(int)
		{
			const_iterator temp = *this;
			if (curr_ != nullptr)
			{
				curr_ = curr_->prev_;
			}
			else
			{
				if (list_->back_ != nullptr)
				{
					curr_ = list_->back_;
				}
			}
			return temp;
		}
		bool operator==(const_iterator rhs)
		{
			bool rc = false;
			if (list_ == rhs.list_ && curr_ == rhs.curr_)
				rc = true;
			return rc;
		}
		bool operator!=(const_iterator rhs)
		{
			return !(*this == rhs);
		}
		const T &operator*() const
		{
			return curr_->data_;
		}
	};
	class iterator : public const_iterator
	{
		friend class DList;
		iterator(Node *n, const DList *list) : const_iterator(n, list) {}

	public:
		iterator() : const_iterator(){};
		iterator operator++()
		{
			if (this->curr_)
			{
				this->curr_ = this->curr_->next_;
			}
			return *this;
		}
		iterator operator++(int)
		{
			iterator temp = *this;
			if (this->curr_)
			{
				this->curr_ = this->curr_->next_;
			}
			return temp;
		}
		iterator operator--()
		{
			if (this->curr_ != nullptr)
			{
				this->curr_ = this->curr_->prev_;
			}
			else
			{
				if (this->list_->back_ != nullptr)
				{
					this->curr_ = this->list_->back_;
				}
			}
			return *this;
		}
		iterator operator--(int)
		{
			iterator temp = *this;
			if (this->curr_ != nullptr)
			{
				this->curr_ = this->curr_->prev_;
			}
			else
			{
				if (this->list_->back_ != nullptr)
				{
					this->curr_ = this->list_->back_;
				}
			}
			return temp;
		}
		T &operator*()
		{
			return this->curr_->data_;
		}
		const T &operator*() const
		{
			return this->curr_->data_;
		}
		std::string key() const
		{
			return this->curr_->key_;
		}
	};

	DList();
	~DList();
	DList(const DList &rhs);
	DList &operator=(const DList &rhs);
	DList(DList &&rhs);
	DList &operator=(DList &&rhs);
	iterator insert(iterator it, const T &data);
	bool push_front(std::string key, const T &data);
	iterator search(std::string key);
	iterator search(const T &data);
	iterator erase(iterator it);
	void sort(iterator first, iterator last);
	bool empty() const;
	int size() const;

	iterator begin()
	{
		if (front_ == nullptr)
		{
			return end();
		}
		else
		{
			return iterator(front_, this);
		}
	}
	iterator end()
	{
		if (back_ == nullptr)
		{
			return iterator(nullptr, this);
		}
		else
		{
			return iterator(back_->next_, this);
		}
	}
	const_iterator cbegin() const
	{
		if (front_ == nullptr)
		{
			return cend();
		}
		else
		{
			return const_iterator(front_, this);
		}
	}
	const_iterator cend() const
	{
		if (back_ == nullptr)
		{
			return const_iterator(nullptr, this);
		}
		else
		{
			return const_iterator(back_->next_, this);
		}
	}
};

// Constructor for DList
// Preconditions: None
// Postconditions: Creates an empty list
template <typename T>
DList<T>::DList()
{
	front_ = nullptr;
	back_ = nullptr;
}

// Destructor for DList
// Preconditions: None
// Postconditions: Deallocates all memory used by the list
template <typename T>
DList<T>::~DList()
{
	while (front_ != nullptr)
	{
		Node *temp = front_;
		front_ = front_->next_;
		delete temp;
	}
}

// Copy Constructor for DList
// Preconditions: None
// Postconditions: Creates a copy of the list by copying each node onto the current list object
template <typename T>
DList<T>::DList(const DList &rhs)
{
	front_ = nullptr;
	back_ = nullptr;
	Node *curr = rhs.front_;
	while (curr != nullptr)
	{
		insert(end(), curr->data_);
		curr = curr->next_;
	}
}

// Assignment operator for DList
// Preconditions: None
// Postconditions: Creates a copy of the list by copying each node onto the current list object
template <typename T>
DList<T> &DList<T>::operator=(const DList &rhs)
{
	if (this != &rhs)
	{
		while (front_ != nullptr)
		{
			Node *temp = front_;
			front_ = front_->next_;
			delete temp;
		}
		front_ = nullptr;
		back_ = nullptr;
		for (Node *n = rhs.front_; n != nullptr; n = n->next_)
		{
			insert(end(), n->data_);
		}
	}
	return *this;
}

// Move Constructor for DList
// Preconditions: None
// Postconditions: Moves the list from the rhs object to the current list object
template <typename T>
DList<T>::DList(DList &&rhs)
{
	front_ = rhs.front_;
	back_ = rhs.back_;
	rhs.front_ = nullptr;
	rhs.back_ = nullptr;
}

// Move Assignment operator for DList
// Preconditions: None
// Postconditions: Moves the list from the rhs object to the current list object
template <typename T>
DList<T> &DList<T>::operator=(DList &&rhs)
{
	if (this != &rhs)
	{
		while (!empty())
		{
			Node *temp = front_;
			front_ = front_->next_;
			delete temp;
		}
		front_ = rhs.front_;
		back_ = rhs.back_;
		rhs.front_ = nullptr;
		rhs.back_ = nullptr;
	}
	return *this;
}

// Node Insert Function
// Preconditions: None
// Postconditions: Inserts a node into the list
// Returns: An iterator pointing to the inserted node.
// Parameters: An iterator pointing to the node position of where to insert the new node, and the data to be inserted.
// Notes: This function is used to insert a node into the list, the node would contain the data being passed in as a parameter and it would be inserted at the node being pointed to by the iterator being passed in.
template <typename T>
typename DList<T>::iterator DList<T>::insert(iterator it, const T &data)
{
	Node *temp = new Node(data);
	if (it.curr_ == nullptr)
	{
		if (front_ == nullptr)
		{
			front_ = temp;
			back_ = temp;
		}
		else
		{
			temp->prev_ = back_;
			back_->next_ = temp;
			back_ = temp;
		}
	}
	else
	{
		if (it.curr_ == front_)
		{
			temp->next_ = front_;
			front_->prev_ = temp;
			front_ = temp;
		}
		else
		{
			temp->next_ = it.curr_;
			temp->prev_ = it.curr_->prev_;
			it.curr_->prev_->next_ = temp;
			it.curr_->prev_ = temp;
		}
	}
	return iterator(temp, this);
}

// Push Front Function
// Preconditions: None
// Postconditions: Inserts a node into the front of the list
// Returns: A bool indicating whether or not the node was successfully inserted
// Parameters: The data to be inserted into the list and the key to be used for the node
// Notes: This function is used to insert a node into the front of the list, the node would contain the key and data being passed in as a parameter and it would be inserted at the front of the list.
template <typename T>
bool DList<T>::push_front(std::string key, const T &data)
{
	Node *temp = new Node(key, data, front_);
	if (front_ == nullptr)
	{
		front_ = temp;
		back_ = temp;
		return true;
	}
	else
	{
		front_->prev_ = temp;
		front_ = temp;
		return true;
	}
	return false;
}

// Node Search Function
// Preconditions: None
// Postconditions: Searches the list for a node with the given key
// Returns: An iterator pointing to the node with the given key, or an iterator pointing to the end of the list if the key is not found
// Parameters: The key to be searched for
// Notes: This function is used to search the list for a node with the given key, if the key is found, the iterator pointing to the node is returned, if the key is not found, the iterator pointing to the end of the list is returned.
template <typename T>
typename DList<T>::iterator DList<T>::search(std::string key)
{
	for (auto it = begin(); it != end(); ++it)
	{
		if (it.curr_->key_ == key)
		{
			return it;
		}
	}
	return end();
}

// Node Search Function
// Preconditions: None
// Postconditions: Searches the list for a node containing the data passed in as a parameter
// Returns: An iterator pointing to the node containing the data passed in as a parameter.
// Parameters: The data to be searched for.
// Notes: This function is used to search the list for a node containing the data passed in as a parameter. If the data is found, the iterator pointing to the node containing the data is returned. If the data is not found, the iterator pointing to the end of the list is returned.
template <typename T>
typename DList<T>::iterator DList<T>::search(const T &data)
{
	for (auto it = begin(); it != end(); ++it)
	{
		if (*it == data)
		{
			return it;
		}
	}
	return end();
}

// Node Erase Function
// Preconditions: None
// Postconditions: Erases the node pointed to by the iterator passed in as a parameter
// Returns: An iterator pointing to the node after the node being erased.
// Parameters: An iterator pointing to the node to be erased.
// Notes: This function is used to erase a node from the list. The node being erased is pointed to by the iterator being passed in. The iterator pointing to the node after the node being erased is returned.
template <typename T>
typename DList<T>::iterator DList<T>::erase(iterator it)
{
	if (it.curr_ == nullptr)
	{
		return end();
	}
	else
	{
		if (it.curr_ == front_ && it.curr_ == back_)
		{
			front_ = nullptr;
			back_ = nullptr;
			delete it.curr_;
			return end();
		}
		else if (it.curr_ == front_)
		{
			front_ = front_->next_;
			front_->prev_ = nullptr;
		}
		else if (it.curr_ == back_)
		{
			back_ = back_->prev_;
			back_->next_ = nullptr;
		}
		else
		{
			it.curr_->prev_->next_ = it.curr_->next_;
			it.curr_->next_->prev_ = it.curr_->prev_;
		}
		Node *temp = it.curr_;
		it.curr_ = it.curr_->next_;
		delete temp;
		return it;
	}
}

// Doubly Linked List Sort Function
// Preconditions: None
// Postconditions: Sorts the list in ascending order
// Returns: None
// Parameters: The iterator pointing to the node to start from and to end at in the list for the sorting.
// Notes: This function is used to sort the list in ascending order, it uses the selection sort algorithm to sort the list. The list is sorted from the node pointed to by the first iterator parameter to the node pointed to by the last iterator parameter.
template <typename T>
void DList<T>::sort(iterator first, iterator last)
{
	if (first == this->begin())
	{
		for (iterator i = first; i != last; ++i)
		{
			if (front_->data_.count_ > (*i).count_)
			{
				if (front_->next_ == i.curr_)
				{
					Node *iAfter = i.curr_->next_;

					iAfter->prev_ = front_;
					front_->next_ = iAfter;
					front_->prev_ = i.curr_;
					i.curr_->next_ = front_;
					i.curr_->prev_ = nullptr;
				}
				else
				{
					Node *iBefore = i.curr_->prev_;
					Node *iAfter = i.curr_->next_;
					Node *fAfter = front_->next_;

					iAfter->prev_ = front_;
					iBefore->next_ = front_;
					fAfter->prev_ = i.curr_;
					front_->prev_ = iBefore;
					front_->next_ = iAfter;
					i.curr_->next_ = fAfter;
					i.curr_->prev_ = nullptr;
				}
				front_ = i.curr_;
			}
		}
		first.curr_ = front_;
	}

	if (last == this->end())
	{
		for (iterator i = first; i.curr_ != nullptr; ++i)
		{
			if ((*i).count_ > back_->data_.count_)
			{
				Node *next = nullptr;
				if (back_->prev_ == i.curr_)
				{
					Node *iBefore = i.curr_->prev_;

					iBefore->next_ = back_;
					back_->next_ = i.curr_;
					back_->prev_ = iBefore;
					i.curr_->prev_ = back_;
					i.curr_->next_ = nullptr;
				}
				else
				{
					Node *lBefore = back_->prev_;
					Node *iAfter = i.curr_->next_;
					Node *iBefore = i.curr_->prev_;

					next = back_;
					iBefore->next_ = back_;
					iAfter->prev_ = back_;
					lBefore->next_ = i.curr_;
					back_->next_ = i.curr_->next_;
					back_->prev_ = i.curr_->prev_;
					i.curr_->prev_ = lBefore;
					i.curr_->next_ = nullptr;
				}
				back_ = i.curr_;
				i.curr_ = next;
			}
		}
		last.curr_ = back_;
	}

	for (iterator i = first; i != last; ++i)
	{
		for (iterator j = i; j != last; ++j)
		{
			if ((*i).count_ > (*j).count_)
			{
				Node *iNext = nullptr;
				Node *jNext = nullptr;

				if (i.curr_->next_ == j.curr_)
				{
					Node *iBefore = i.curr_->prev_;
					Node *jAfter = j.curr_->next_;

					jNext = i.curr_;
					iNext = j.curr_;

					iBefore->next_ = j.curr_;
					jAfter->prev_ = i.curr_;
					i.curr_->next_ = jAfter;
					j.curr_->prev_ = iBefore;
					i.curr_->prev_ = j.curr_;
					j.curr_->next_ = i.curr_;
				}
				else
				{
					Node *iBefore = i.curr_->prev_;
					Node *jBefore = j.curr_->prev_;
					Node *iAfter = i.curr_->next_;
					Node *jAfter = j.curr_->next_;

					jNext = i.curr_;
					iNext = j.curr_;

					iBefore->next_ = j.curr_;
					jBefore->next_ = i.curr_;
					iAfter->prev_ = j.curr_;
					jAfter->prev_ = i.curr_;
					i.curr_->next_ = jAfter;
					i.curr_->prev_ = jBefore;
					j.curr_->next_ = iAfter;
					j.curr_->prev_ = iBefore;
				}
				j.curr_ = jNext;
				i.curr_ = iNext;
			}
		}
	}
}

// Empty Check Function
// Preconditions: None
// Postconditions: Checks if the list is empty
// Returns: True if the list is empty, false if it is not.
// Parameters: None
// Notes: This function is used to check if the list is empty. If the list is empty, true is returned. If the list is not empty, false is returned.
template <typename T>
bool DList<T>::empty() const
{
	return front_ == nullptr;
}

// Size Check Function
// Preconditions: None
// Postconditions: Checks the size of the list
// Returns: The size of the list
// Parameters: None
// Notes: This function is used to check the size of the list by counting the number of nodes in the list using the iterators supported by the list. The size of the list is returned.
template <typename T>
int DList<T>::size() const
{
	int count = 0;
	for (auto it = cbegin(); it != cend(); ++it)
	{
		++count;
	}
	return count;
}
