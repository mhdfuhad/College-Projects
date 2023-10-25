#include <iostream>
using namespace std;

template <class T>
class ThreadedTree
{
	struct Node
	{
		T data_;
		Node *left_;
		Node *right_;
		bool leftThread_;
		bool rightThread_;
		Node(const T &data = T{}, Node *left = nullptr, Node *right = nullptr)
		{
			this->data_ = data;
			this->left_ = left;
			this->right_ = right;
			this->leftThread_ = true;
			this->rightThread_ = true;
		}
	};

	Node *root_;
	int size_; // Tracks the number of nodes in the tree
public:
	class const_iterator
	{
	protected:
		Node *current_;
		const ThreadedTree *tree_;
		const_iterator(Node *current, const ThreadedTree *tree)
		{
			current_ = current;
			tree_ = tree;
		}
	public:
		const_iterator()
		{
			current_ = nullptr;
			tree_ = nullptr;
		}
		const_iterator operator++(int)
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->right_;
				if (temp->rightThread_ == false)
					while (this->current_->leftThread_ == false)
						this->current_ = this->current_->left_;
			}
			return const_iterator(temp, this->tree_);
		}
		const_iterator operator--(int)
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->left_;
				if (temp->leftThread_ == false)
					while (this->current_->rightThread_ == false)
						this->current_ = this->current_->right_;
			}
			else
			{
				this->current_ = this->tree_->root_;
				if (this->current_)
					while (this->current_->right_ != nullptr)
						this->current_ = this->current_->right_;
			}
			return const_iterator(temp, this->tree_);
		}
		const_iterator operator++()
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->right_;
				if (temp->rightThread_ == false)
					while (this->current_->leftThread_ == false)
						this->current_ = this->current_->left_;
			}
			return *this;
		}
		const_iterator operator--()
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->left_;
				if (temp->leftThread_ == false)
					while (this->current_->rightThread_ == false)
						this->current_ = this->current_->right_;
			}
			else
			{
				this->current_ = this->tree_->root_;
				if (this->current_)
					while (this->current_->right_ != nullptr)
						this->current_ = this->current_->right_;
			}
			return *this;
		}
		const T &operator*() const
		{
			return current_->data_;
		}
		bool operator==(const const_iterator &rhs) const
		{
			return current_ == rhs.current_;
		}
		bool operator!=(const const_iterator &rhs) const
		{
			return current_ != rhs.current_;
		}
		friend class ThreadedTree;
	};
	class iterator : public const_iterator
	{
		iterator(Node *current, const ThreadedTree *tree) : const_iterator(current, tree) {}
	public:
		iterator() : const_iterator() {}
		const T &operator*() const
		{
			return this->current_->data_;
		}
		T &operator*()
		{
			return this->current_->data_;
		}
		iterator operator++(int)
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->right_;
				if (temp->rightThread_ == false)
					while (this->current_->leftThread_ == false)
						this->current_ = this->current_->left_;
			}
			return iterator(temp, this->tree_);
		}
		iterator operator--(int)
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->left_;
				if (temp->leftThread_ == false)
					while (this->current_->rightThread_ == false)
						this->current_ = this->current_->right_;
			}
			else
			{
				this->current_ = this->tree_->root_;
				if (this->current_)
					while (this->current_->right_ != nullptr)
						this->current_ = this->current_->right_;
			}
			return iterator(temp, this->tree_);
		}
		iterator operator++()
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->right_;
				if (temp->rightThread_ == false)
					while (this->current_->leftThread_ == false)
						this->current_ = this->current_->left_;
			}
			return *this;
		}
		iterator operator--()
		{
			Node *temp = this->current_;
			if (this->current_ != nullptr)
			{
				this->current_ = this->current_->left_;
				if (temp->leftThread_ == false)
					while (this->current_->rightThread_ == false)
						this->current_ = this->current_->right_;
			}
			else
			{
				this->current_ = this->tree_->root_;
				if (this->current_)
					while (this->current_->right_ != nullptr)
						this->current_ = this->current_->right_;
			}
			return *this;
		}

		friend class ThreadedTree;
	};

	// Function: Constructor
	// Description: Constructor of ThreadedTree
	// Pre-condition: None
	// Post-condition: None
	// Return: None
	ThreadedTree()
	{
		root_ = nullptr;
		size_ = 0;
	}

	// Function: Insert
	// Description: Insert a new node into the tree
	// Pre-condition: None
	// Post-condition: New node is inserted into the tree
	// Return: None
	void insert(const T &data)
	{
		if (root_)
		{
			Node *current = root_;
			bool isInserted = false;
			while (!isInserted)
			{
				if (data < current->data_ && current->leftThread_ == false)
					current = current->left_;
				else if (!(data < current->data_) && current->rightThread_ == false)
					current = current->right_;
				else
				{
					if (data < current->data_)
					{
						Node *nn = new Node(data, current->left_, current);
						current->left_ = nn;
						current->leftThread_ = false;
						size_++;
						isInserted = true;
					}
					else
					{
						Node *nn = new Node(data, current, current->right_);
						current->right_ = nn;
						current->rightThread_ = false;
						size_++;
						isInserted = true;
					}
				}
			}
		}
		else
		{
			root_ = new Node(data);
			size_++;
		}
	}


	// Function: Find
	// Description: Find a node in the tree according to the given key
	// Pre-condition: Key must be provided
	// Post-condition: An iterator pointing to the node is returned
	// Return: An iterator pointing to the node
	iterator find(const T &key)
	{
		Node *current = root_;
		int limit = size(); // If the loop below has run till the size of the tree then key does not exist
		int i = 0;

		while (current->data_ != key && i < limit)
		{
			if (key < current->data_)
				current = current->left_;
			else
				current = current->right_;
			i++;
		}

		if (i == limit) // As key does not exist we return end()
			return end();

		return iterator(current, this);
	}

	// Function: Find
	// Description: Find a node in the tree according to the given key
	// Pre-condition: Key must be provided
	// Post-condition: A const_iterator pointing to the node is returned
	// Return: A const_iterator pointing to the node
	const_iterator find(const T &key) const
	{
		Node *current = root_;
		int limit = size(); // If the loop below has run till the size of the tree then key does not exist
		int i = 0;

		while (current->data_ != key && i < limit)
		{
			if (key < current->data_)
				current = current->left_;
			else
				current = current->right_;
			i++;
		}

		if (i == limit) // As key does not exist we return cend()
			return cend();

		return const_iterator(current, this);
	}

	// Function: Begin
	// Description: Return an iterator pointing to the first node in the tree
	// Pre-condition: None
	// Post-condition: None
	// Return: An iterator pointing to the first node in the tree
	iterator begin()
	{
		Node *current = root_;
		if (current != nullptr)
		{
			while (current->left_ != nullptr) // Reach left most side of the tree for the smallest node
			{
				current = current->left_;
			}
		}
		return iterator(current, this);
	}

    // Function: End
	// Description: Return an iterator pointing to the node after end of the tree
	// Pre-condition: None
	// Post-condition: None
	// Return: An iterator pointing to the node after end of the tree
	iterator end()
	{
		Node *current = root_;
		if (current != nullptr)
		{
			while (current->right_ != nullptr) // Reach the right most side of the tree for the largest node
			{
				current = current->right_;
			}
		}
		iterator it(current, this);
		it++; // Increment to the node after the largest node in the tree
		return it;
	}

	// Function: Const Begin
	// Description: Return a const_iterator pointing to the first node in the tree
	// Pre-condition: None
	// Post-condition: None
	// Return: A const_iterator pointing to the first node in the tree
	const_iterator cbegin() const
	{
		Node *current = root_;
		if (current != nullptr)
		{
			while (current->left_ != nullptr) // Reach left most side of the tree for the smallest node
			{
				current = current->left_;
			}
		}
		return const_iterator(current, this);
	}

    // Function: Const End
	// Description: Return a const_iterator pointing to the node after end of the tree
	// Pre-condition: None
	// Post-condition: None
	// Return: A const_iterator pointing to the node after end of the tree
	const_iterator cend() const
	{
		Node *current = root_;
		if (current != nullptr)
		{
			while (current->right_ != nullptr) // Reach the right most side of the tree for the largest node
			{
				current = current->right_;
			}
		}
		const_iterator it(current, this);
		it++; // Increment to the node after the largest node in the tree
		return it;
	}

	// Function: Size
	// Description: Returns the number of nodes in the tree
	// Preconditions: None
	// Postconditions: Size of tree returned
	// Return: an integer representing the number of nodes in the tree

	int size() const
	{
		return size_;
	}

	// Function: Empty
	// Description: Returns true if the tree is empty, false otherwise.
	// Pre-conditions: None
	// Post-conditions: Checked if the tree is empty
	// Return: True if the tree is empty, false otherwise.
	bool empty() const
	{
		return size_ == 0;
	}

	// Function: Destroy
	// Description: Destroys the tree.
	// Pre-condition: Tree is not empty
	// Post-condition: Tree is empty
	// Parameter: node - the root of the tree
	// Return: void
	void destroy(Node *subroot)
	{
		if (subroot)
		{
			if (!subroot->leftThread_)
				destroy(subroot->left_);
			if (!subroot->rightThread_)
				destroy(subroot->right_);
			delete subroot;
			subroot = nullptr;
		}
	}

	// Function: Destructor
	// Description: Destroys the tree.
	// Pre-condition: Tree is not empty
	// Post-condition: Tree is empty
	// Parameter: none
	// Return: void
	// Note: This function calls the destroy function that was defined above as it is a recursive function that traverses the tree and deletes all nodes
	~ThreadedTree()
	{
		destroy(root_);
	}
};
