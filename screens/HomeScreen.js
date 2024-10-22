import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFetchData from '../hooks/useFetchData'; // Import the custom hook
import CategoryButtons from '../components/CategoryButtons'; // Import the Category Buttons component

const HomeScreen = () => {
    // Use the custom hook to fetch data from TheMealDB API
    const { data, loading, error } = useFetchData('https://www.themealdb.com/api/json/v1/1/categories.php');

    // Log the fetched data for debugging
    console.log(data); // Check the structure of the fetched data

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    // Helper function to generate random height for product card
    const getRandomHeight = () => {
        return Math.floor(Math.random() * (250 - 150 + 1) + 150); // Random height between 150 and 250
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#000" />
                <TextInput
                    placeholder="Search for categories"
                    style={styles.searchInput}
                />
                <Icon name="filter" size={20} color="#000" style={styles.filterIcon} />
            </View>

            {/* Category Buttons */}
            <CategoryButtons />

            {/* Category Grid from API */}
            <FlatList
                data={data} // Data fetched from the API
                numColumns={2}
                keyExtractor={item => item.idCategory.toString()} // TheMealDB uses 'idCategory' as the ID
                renderItem={({ item }) => (
                    <View style={[styles.productCard, { height: getRandomHeight() }]}>
                        <Image 
                            source={{ uri: item.strCategoryThumb }} // Use category image
                            style={styles.categoryImage}
                        />
                        {/* Ensure category name is wrapped in Text component */}
                        <Text style={styles.productName}>{item.strCategory}</Text> {/* Category Name */}
                        <Text style={styles.price}>From Tesco</Text> {/* Additional example text */}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 20,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 16,
    },
    filterIcon: {
        marginLeft: 10,
    },
    productCard: {
        flex: 1,
        backgroundColor: '#FFE5B4', // Example background color similar to the mango card
        margin: 10,
        padding: 20,
        borderRadius: 20, // Rounded corners
        alignItems: 'center',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
        elevation: 5, // Elevation for Android shadow
    },
    categoryImage: {
        width: 100, // Set the width of the image
        height: 100, // Set the height of the image
        borderRadius: 50, // Rounded image (circle)
        marginBottom: 10, // Space between image and text
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#888', // Slightly lighter color for price/store info
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HomeScreen;
