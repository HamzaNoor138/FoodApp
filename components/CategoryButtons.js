import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
    { id: 1, name: 'coffee' },
    { id: 2, name: 'fresh-produce' },
    { id: 3, name: 'meat-seafood' },
    { id: 4, name: 'candy' },
    
];

const CategoryButtons = ({ onSelectCategory }) => {
    return (
        <View style={styles.categoryContainer}>
            {categories.map(category => (
                <TouchableOpacity
                    key={category.id}
                    style={styles.categoryButton}
                    onPress={() => onSelectCategory(category.name)}
                >
                    <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#4CAF50',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
    },
    categoryText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
});

export default CategoryButtons;
