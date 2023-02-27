<script setup>
import { RouterLink, RouterView } from 'vue-router'
 // const btn = document.querySelector("button.mobile-menu-button");
    // const menu = document.querySelector(".mobile-menu");

    // btn.addEventListener("click", () => {
    //     menu.classList.toggle("hidden");
    // });

</script>

<template>
<nav class="bg-gray-900 text-white relative w-full flex flex-wrap
items-center
justify-between
py-4
shadow-2xl
sticky top-0 z-20 ease-in-out duration-400 translate-y-0
navbar navbar-expand-lg navbar-light border border-gray-700">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-4 text-white">  
        <!-- Website Logo and Title w/ home link -->
        <RouterLink to="/" class="flex items-center hover:bg-blue-900 text-white">
            <img src="/book.png" alt="logo" style="width:48px;height:48px;" class="mx-2 ">
            <span class="font-semibold text-xl text-white">HomeLib</span>
        </RouterLink>
            <!-- Left Navbar items -->
            <div class="mx-10 navbar-nav flex flex-col pl-0 list-style-none mr-auto">
    
            </div>
                <!-- Right Side Navbar items, login, join -->
                <div class="flex items-center relative text-white">
                    <a href="" class="text-sm py-2 px-4 font-bold  rounded hover:bg-indigo-600 text-white transition duration-300">LogIn</a>
                    <a href="" class="text-sm mx-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded">Join</a>
                </div>
                    <!--Dark or light mode toggle here-->
                    <div>


                    </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button">
                <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                    x-show="!showMenu"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            </div>
     
    </div>
    <!-- mobile menu -->
    <div class="hidden mobile-menu">
        <ul class="">
            <li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
            <li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
            <li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
        </ul>
    </div>
</nav>


</template>