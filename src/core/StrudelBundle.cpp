#include "core/StrudelBundle.h"

#include <BinaryData.h>

namespace Descartes {

juce::String strudelBundleSource() {
    return juce::String::createStringFromData(DescartesJs::strudelbundle_js, DescartesJs::strudelbundle_jsSize);
}

} // namespace Descartes
