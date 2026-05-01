import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Murree Weather Guide 2024 | Current Conditions & Seasonal Forecast",
  description: "Complete Murree weather guide with current conditions, seasonal patterns, monthly breakdown, and best time to visit. Real-time weather updates for travelers planning trips to Murree Hills.",
  keywords: "Murree weather, Murree climate, Murree temperature, best time to visit Murree, Murree weather forecast, Murree seasonal weather, Murree rainfall, Murree snowfall",
  openGraph: {
    title: "Murree Weather Guide - Current Conditions & Seasonal Forecast",
    description: "Complete weather guide for Murree with current conditions, seasonal patterns, and travel tips for planning your perfect mountain getaway.",
    type: "website",
    url: "https://himalayavillas.com/murree-weather",
  },
  alternates: {
    canonical: "https://himalayavillas.com/murree-weather",
  },
};

export default function MurreeWeatherPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-400 to-sky-600 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Murree Weather Guide
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-semibold">
            Current Conditions • Seasonal Patterns • Best Time to Visit
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
            Complete weather information for Murree Hills - from summer breezes to winter snowfalls. Plan your perfect mountain getaway with our comprehensive weather guide.
          </p>
          
          {/* Current Weather Widget */}
          <div className="bg-white/20 backdrop-blur-sm text-white p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Current Weather in Murree</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">18°C</p>
                <p className="text-sm">Temperature</p>
              </div>
              <div>
                <p className="text-3xl font-bold">65%</p>
                <p className="text-sm">Humidity</p>
              </div>
              <div>
                <p className="text-3xl font-bold">12 km/h</p>
                <p className="text-sm">Wind Speed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">Partly Cloudy</p>
                <p className="text-sm">Conditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Weather Conditions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Current Weather Conditions
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Real-time weather data for Murree Hills, updated every hour to help you plan your activities and packing accordingly.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-sky-600 mb-4">Temperature</h3>
              <p className="text-3xl font-bold text-[#1b261b] mb-2">18°C</p>
              <p className="text-gray-600">Feels like 16°C</p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>High: 22°C</p>
                <p>Low: 14°C</p>
                <p>Dew Point: 12°C</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-sky-600 mb-4">Atmospheric Conditions</h3>
              <p className="text-3xl font-bold text-[#1b261b] mb-2">65%</p>
              <p className="text-gray-600">Humidity</p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Pressure: 1013 hPa</p>
                <p>Visibility: 10 km</p>
                <p>UV Index: 6 (High)</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-sky-600 mb-4">Wind & Precipitation</h3>
              <p className="text-3xl font-bold text-[#1b261b] mb-2">12 km/h</p>
              <p className="text-gray-600">Wind Speed</p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Direction: Northwest</p>
                <p>Precipitation: 0%</p>
                <p>Cloud Cover: 40%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Weather Patterns */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Seasonal Weather Patterns
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Murree experiences four distinct seasons, each offering unique weather conditions and travel experiences.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Spring</h3>
              <p className="text-gray-700 mb-4">March - May</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Temperature: 10°C - 25°C</li>
                <li>Pleasant and mild</li>
                <li>Flowering season</li>
                <li>Light rainfall</li>
                <li>Best for sightseeing</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Summer</h3>
              <p className="text-gray-700 mb-4">June - August</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Temperature: 15°C - 28°C</li>
                <li>Peak tourist season</li>
                <li>Occasional rain</li>
                <li>Lush green landscapes</li>
                <li>Perfect for hiking</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🍂</div>
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Autumn</h3>
              <p className="text-gray-700 mb-4">September - November</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Temperature: 8°C - 22°C</li>
                <li>Crisp and clear</li>
                <li>Fall foliage</li>
                <li>Low humidity</li>
                <li>Photography season</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">❄️</div>
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">Winter</h3>
              <p className="text-gray-700 mb-4">December - February</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Temperature: -2°C - 10°C</li>
                <li>Snowfall common</li>
                <li>Skiing season</li>
                <li>Foggy conditions</li>
                <li>Cozy retreat time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Weather Breakdown */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Monthly Weather Breakdown
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Detailed weather statistics for each month to help you plan your visit with precision.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1b261b] text-white">
                  <th className="p-4 text-left">Month</th>
                  <th className="p-4 text-center">High (°C)</th>
                  <th className="p-4 text-center">Low (°C)</th>
                  <th className="p-4 text-center">Rainfall (mm)</th>
                  <th className="p-4 text-center">Snow Days</th>
                  <th className="p-4 text-center">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">January</td>
                  <td className="p-4 text-center">8</td>
                  <td className="p-4 text-center">-2</td>
                  <td className="p-4 text-center">65</td>
                  <td className="p-4 text-center">8</td>
                  <td className="p-4 text-center text-sm">Snow activities</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">February</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center">55</td>
                  <td className="p-4 text-center">6</td>
                  <td className="p-4 text-center text-sm">Snow viewing</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">March</td>
                  <td className="p-4 text-center">15</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">85</td>
                  <td className="p-4 text-center">2</td>
                  <td className="p-4 text-center text-sm">Spring blooms</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">April</td>
                  <td className="p-4 text-center">20</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">95</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Flowers</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">May</td>
                  <td className="p-4 text-center">25</td>
                  <td className="p-4 text-center">13</td>
                  <td className="p-4 text-center">75</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Pleasant weather</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">June</td>
                  <td className="p-4 text-center">28</td>
                  <td className="p-4 text-center">16</td>
                  <td className="p-4 text-center">120</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Summer escape</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">July</td>
                  <td className="p-4 text-center">26</td>
                  <td className="p-4 text-center">18</td>
                  <td className="p-4 text-center">280</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Monsoon season</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">August</td>
                  <td className="p-4 text-center">25</td>
                  <td className="p-4 text-center">17</td>
                  <td className="p-4 text-center">250</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Green landscapes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">September</td>
                  <td className="p-4 text-center">23</td>
                  <td className="p-4 text-center">14</td>
                  <td className="p-4 text-center">110</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Clear skies</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-semibold">October</td>
                  <td className="p-4 text-center">20</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">45</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center text-sm">Autumn colors</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">November</td>
                  <td className="p-4 text-center">15</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">25</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center text-sm">Crisp air</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold">December</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">0</td>
                  <td className="p-4 text-center">50</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center text-sm">Winter begins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Weather Forecast */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            7-Day Weather Forecast
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Plan your week ahead with our detailed 7-day weather forecast for Murree Hills.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { day: 'Mon', temp: '20°', condition: 'Sunny', icon: '☀️' },
              { day: 'Tue', temp: '18°', condition: 'Partly Cloudy', icon: '⛅' },
              { day: 'Wed', temp: '16°', condition: 'Rainy', icon: '🌧️' },
              { day: 'Thu', temp: '17°', condition: 'Cloudy', icon: '☁️' },
              { day: 'Fri', temp: '19°', condition: 'Sunny', icon: '☀️' },
              { day: 'Sat', temp: '21°', condition: 'Partly Cloudy', icon: '⛅' },
              { day: 'Sun', temp: '22°', condition: 'Sunny', icon: '☀️' },
            ].map((day, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center">
                <p className="font-semibold text-[#1b261b] mb-2">{day.day}</p>
                <div className="text-3xl mb-2">{day.icon}</div>
                <p className="text-xl font-bold text-[#c9a55b] mb-1">{day.temp}</p>
                <p className="text-xs text-gray-600">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Best Time to Visit Murree
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Choose the perfect time for your Murree visit based on your preferences and planned activities.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">🌟 Best Overall: April - June</h3>
              <p className="text-gray-700 mb-4">Ideal weather with pleasant temperatures and clear skies.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Temperature: 15°C - 28°C</li>
                <li>• Low rainfall in April-May</li>
                <li>• Perfect for outdoor activities</li>
                <li>• Blooming flowers and green landscapes</li>
                <li>• Peak tourist season</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">❄️ Winter Wonderland: December - February</h3>
              <p className="text-gray-700 mb-4">For snow lovers and winter sports enthusiasts.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Temperature: -2°C - 10°C</li>
                <li>• Regular snowfall</li>
                <li>• Skiing and snow activities</li>
                <li>• Cozy fireplace evenings</li>
                <li>• Fewer crowds</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">🍂 Autumn Beauty: September - November</h3>
              <p className="text-gray-700 mb-4">Crisp air and spectacular fall foliage.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Temperature: 8°C - 23°C</li>
                <li>• Clear skies and low humidity</li>
                <li>• Photography season</li>
                <li>• Comfortable for hiking</li>
                <li>• Moderate tourist flow</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">🌸 Spring Awakening: March - May</h3>
              <p className="text-gray-700 mb-4">Flowers bloom and nature comes alive.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Temperature: 10°C - 25°C</li>
                <li>• Cherry and peach blossoms</li>
                <li>• Mild and pleasant weather</li>
                <li>• Perfect for sightseeing</li>
                <li>• Pre-peak season pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Tips for Travelers */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Weather Tips for Travelers
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Essential tips to help you prepare for Murree's weather conditions and make the most of your visit.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">🧥 Packing Essentials</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Layered clothing for temperature changes</li>
                <li>• Waterproof jacket for rain</li>
                <li>• Warm sweater for evenings</li>
                <li>• Comfortable walking shoes</li>
                <li>• Sunscreen and hat</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">🚗 Travel Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Check road conditions in winter</li>
                <li>• Carry tire chains for snow</li>
                <li>• Start early to avoid traffic</li>
                <li>• Keep emergency supplies</li>
                <li>• Check weather before departure</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">🏠 Accommodation Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Book heating for winter stays</li>
                <li>• Choose south-facing rooms</li>
                <li>• Check for backup power</li>
                <li>• Verify hot water supply</li>
                <li>• Ask about weather contingency</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">📸 Photography Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Best light: early morning</li>
                <li>• Clear days for mountain views</li>
                <li>• Fog creates dramatic shots</li>
                <li>• Winter snow for magical scenes</li>
                <li>• Protect camera from moisture</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">🍽️ Dining Considerations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Hot tea in winter months</li>
                <li>• Indoor dining during rain</li>
                <li>• Local seasonal specialties</li>
                <li>• Book restaurants in peak season</li>
                <li>• Room service during bad weather</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-4">⚠️ Safety Precautions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Avoid hiking in heavy rain</li>
                <li>• Stay updated on weather alerts</li>
                <li>• Keep emergency contacts handy</li>
                <li>• Don't travel in severe weather</li>
                <li>• Carry first aid kit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Weather FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b261b] mb-8">
            Weather Frequently Asked Questions
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-700">
            Common questions about Murree's weather patterns answered to help you plan your trip better.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">When does it snow in Murree?</h3>
              <p className="text-gray-700">
                Snowfall typically occurs from December through February, with January being the snowiest month. However, occasional snow can also fall in late November and early March. The best chance of seeing snow is between mid-December and early February.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">What is the rainy season in Murree?</h3>
              <p className="text-gray-700">
                The monsoon season brings the heaviest rainfall from July to August, with July being the wettest month receiving around 280mm of rain. Secondary rainfall periods occur in March-April during spring showers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">Is Murree cold in summer?</h3>
              <p className="text-gray-700">
                Summer in Murree (June-August) is pleasantly cool compared to the plains, with temperatures ranging from 15°C to 28°C. It's a popular summer retreat for people escaping the heat of Islamabad, Lahore, and other cities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">What should I wear in Murree?</h3>
              <p className="text-gray-700">
                Pack layered clothing regardless of season. In winter, bring heavy woolens, warm jackets, gloves, and caps. In summer, light woolens for evenings with cotton clothes for daytime. Always include a waterproof jacket and comfortable walking shoes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">When is the best weather for photography?</h3>
              <p className="text-gray-700">
                September-November offers the clearest skies and best lighting conditions. Spring (March-May) provides beautiful floral backdrops. Winter creates magical snow scenes, while summer offers lush green landscapes. Early morning light is consistently good year-round.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#c9a55b] mb-3">How accurate are Murree weather forecasts?</h3>
              <p className="text-gray-700">
                Weather forecasts are generally reliable for 2-3 days ahead. Mountain weather can change quickly, so always check current conditions before traveling. During monsoon season, forecasts become less predictable due to sudden weather changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#1b261b] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#c9a55b]">
            Plan Your Perfect Murree Getaway
          </h2>
          <p className="text-lg mb-8">
            Now that you know about Murree's weather, let us help you plan the perfect mountain escape at Himalaya Villas.
          </p>
          <div className="bg-[#c9a55b] text-[#1b261b] p-8 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Weather-Perfect Accommodation</h3>
            <p className="text-lg mb-6">Enjoy Murree's weather in comfort with our climate-controlled luxury villas</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://wa.me/923045679000" 
                className="bg-[#1b261b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a342a] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Weather & Book
              </a>
              <a 
                href="/rooms-villas" 
                className="bg-white text-[#1b261b] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Villas
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
